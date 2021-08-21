import React, { useState } from "react";
import {
  Row,
  Col,
  Input,
  Button,
  Tree,
  Space,
  Upload,
  Empty,
  message,
} from "antd";
import JsonLine from "./json-line";
const { TextArea } = Input;

function jsonToTree(parentKey, root) {
  const tree = [];
  for (const propertyName in root) {
    const treeKey = `${parentKey}:${propertyName}`;
    const element = root[propertyName];
    let propertyType = typeof element;
    if (propertyType === "object") {
      if (element === null) {
        tree.push({
          key: treeKey,
          title: <JsonLine name={propertyName} type={"null"} value={"null"} />,
        });
        continue;
      }
      let itemsLength = 0;
      if (Array.isArray(element)) {
        propertyType = `array`;
        itemsLength = element.length;
      } else {
        console.log(element);
        itemsLength = Object.keys(element).length;
      }
      tree.push({
        key: treeKey,
        title: (
          <JsonLine
            name={propertyName}
            type={propertyType}
            itemsLength={itemsLength}
          />
        ),
        children: jsonToTree(treeKey, element),
      });
    } else {
      tree.push({
        key: treeKey,
        title: (
          <JsonLine
            name={propertyName}
            type={propertyType}
            value={element.toString()}
          />
        ),
      });
    }
  }
  return tree;
}

export default function JsonViewer() {
  const [input, setInput] = useState("");
  const [jsonViewTree, setJsonViewTree] = useState([]);

  function btnFormatClicked() {
    try {
      const root = JSON.parse(input);
      setInput(JSON.stringify(root, null, 4));
    } catch (error) {
      message.error(error.message);
    }
  }
  function btnCompactClicked() {
    setInput(input.replace(/\s/g, ""));
  }
  function btnEscapeClicked() {
    setInput(JSON.stringify(input));
  }
  function btnAntiEscapeClicked() {
    try {
      const antiEscaped = JSON.parse(input);
      if (typeof antiEscaped === "object") {
        return;
      }
      setInput(antiEscaped);
    } catch (error) {
      message.error(error.message);
    }
  }
  function btnViewClicked() {
    try {
      const root = JSON.parse(input);
      const tree = jsonToTree("root", root);
      setJsonViewTree(tree);
    } catch (error) {
      message.error(error.message);
    }
  }
  function btnClearClicked() {
    setInput("");
    setJsonViewTree([]);
  }
  function btnImportClicked(file) {
    try {
      const fr = new FileReader();
      fr.onload = (e) => {
        setInput(e.target.result);
      };
      fr.readAsText(file);
    } catch (error) {
      message.error(error.message);
    } finally {
      // stop upload and don't show in upload list.
      return Upload.LIST_IGNORE;
    }
  }

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Space>
          <Button disabled={!input} onClick={btnFormatClicked} type="primary">
            Format
          </Button>
          <Button disabled={!input} onClick={btnCompactClicked} type="primary">
            Compact
          </Button>
          <Button disabled={!input} onClick={btnEscapeClicked} type="primary">
            Escape
          </Button>
          <Button
            disabled={!input}
            onClick={btnAntiEscapeClicked}
            type="primary"
          >
            Anti Escape
          </Button>
          <Button disabled={!input} onClick={btnViewClicked} type="primary">
            View
          </Button>
          <Button disabled={!input} onClick={btnClearClicked}>
            Clear
          </Button>
          {jsonViewTree && jsonViewTree.length > 0 && (
            <Upload accept=".json" beforeUpload={btnImportClicked}>
              <Button type="primary">Import</Button>
            </Upload>
          )}
        </Space>
      </Col>
      <Col xs={24} sm={24} md={8}>
        <TextArea
          style={{ height: "600px", resize: "none" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="paste your json to here."
        />
      </Col>
      <Col xs={24} sm={24} md={16}>
        {jsonViewTree && jsonViewTree.length > 0 ? (
          <Tree
            style={{ height: "600px" }}
            defaultExpandAll
            height={600}
            treeData={jsonViewTree}
          />
        ) : (
          <Empty>
            <Upload accept=".json" beforeUpload={btnImportClicked}>
              <Button type="primary">Import</Button>
            </Upload>
          </Empty>
        )}
      </Col>
    </Row>
  );
}
