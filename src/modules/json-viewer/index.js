import React, { useState } from "react";
import { Row, Col, Input, Button, Tree, Typography, Space, Upload } from "antd";
import JsonLine from "./json-line";
const { TextArea } = Input;
const { Text } = Typography;

export default function JsonViewer() {
  const [input, setInput] = useState("");
  const [jsonViewTree, setJsonViewTree] = useState([]);

  function btnViewClicked() {
    const root = JSON.parse(input);
    const tree = jsonToTree("root", root);
    setJsonViewTree(tree);
  }
  function btnClearClicked() {
    setInput("");
    setJsonViewTree([]);
  }
  function btnImportClicked(file) {
    debugger;
    const fr = new FileReader();
    fr.onload = (e) => {
      setInput(e.target.result);
    };
    fr.readAsText(file);
    // stop upload and don't show in upload list.
    return Upload.LIST_IGNORE;
  }
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
            title: <JsonLine propertyName={propertyName} propertyType={"null"} value={"null"} />,
          });
          continue;
        }
        if (Array.isArray(element)) {
          propertyType = `array[${element.length}]`;
        }
        tree.push({
          key: treeKey,
          title: <JsonLine propertyName={propertyName} propertyType={propertyType} value={null} />,
          children: jsonToTree(treeKey, element),
        });
      } else {
        tree.push({
          key: treeKey,
          title: <JsonLine propertyName={propertyName} propertyType={propertyType} value={element} />,
        });
      }
    }
    return tree;
  }

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Space>
          <Button disabled={!input} onClick={btnViewClicked} type="primary">
            View
          </Button>
          <Button disabled={!input} onClick={btnClearClicked}>
            Clear
          </Button>
          <Upload accept=".json" beforeUpload={btnImportClicked}>
            <Button type="primary">Import</Button>
          </Upload>
        </Space>
      </Col>
      <Col span={12}>
        <TextArea
          style={{ height: "500px" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="paste your json to here."
        />
      </Col>
      <Col span={12}>
        {jsonViewTree && jsonViewTree.length > 0 ? <Tree height={500} treeData={jsonViewTree} /> : <Text>No data</Text>}
      </Col>
    </Row>
  );
}
