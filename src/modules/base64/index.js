import { Row, Col, Input, Space, Button } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useMemo, useState } from "react";
const { TextArea } = Input;
export default function Base64() {
  const screens = useBreakpoint();

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const canEncodeOrDecode = useMemo(() => !!source, [source]);
  const canClear = useMemo(() => !!source || !!destination, [source, destination]);
  const buttonsDirection = useMemo(() => (screens.md ? "vertical" : "horizontal"), [screens]);
  function btnClearClicked() {
    setSource("");
    setDestination("");
  }
  function btnEncodeClicked() {
    const buf = Buffer.from(source, "utf-8");
    const encoded = buf.toString("base64");
    setDestination(encoded);
  }
  function btnDecodeClicked() {
    const buf = Buffer.from(source, "base64");
    const decoded = buf.toString("utf-8");
    setDestination(decoded);
  }

  return (
    <Row gutter={[8, 8]} align="middle">
      <Col xs={24} sm={24} md={10} lg={11}>
        <TextArea
          value={source}
          onChange={(e) => setSource(e.target.value)}
          style={{ height: "600px", resize: "none" }}
          placeholder="Paset plain text or base64 encoded string to here."
        ></TextArea>
      </Col>
      <Col xs={24} sm={24} md={4} lg={2}>
        <Space direction={buttonsDirection} align={"center"} style={{ width: "100%" }}>
          <Button onClick={btnEncodeClicked} disabled={!canEncodeOrDecode} type="primary">
            Encode
          </Button>
          <Button onClick={btnDecodeClicked} disabled={!canEncodeOrDecode} type="primary">
            Decode
          </Button>
          <Button onClick={btnClearClicked} disabled={!canClear}>
            Clear
          </Button>
        </Space>
      </Col>
      <Col xs={24} sm={24} md={10} lg={11}>
        <TextArea
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={{ height: "600px", resize: "none" }}
          readOnly
          placeholder="Click Encode(Decode) button to Encode(Decode)."
        ></TextArea>
      </Col>
    </Row>
  );
}
