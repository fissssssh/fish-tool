import { Row, Col, Input, Space, Button, message } from "antd";
import React from "react";
const { TextArea } = Input;

export default class Base64 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { source: null, destination: null };
    this.btnClearClicked = this.btnClearClicked.bind(this);
    this.btnEncodeClicked = this.btnEncodeClicked.bind(this);
    this.btnDecodeClicked = this.btnDecodeClicked.bind(this);
  }
  get canEncodeOrDecode() {
    return !!this.state.source;
  }
  get canClear() {
    return !!this.state.source || !!this.state.destination;
  }
  btnClearClicked() {
    this.setState({ source: null, destination: null });
  }
  btnEncodeClicked() {
    try {
      const buf = Buffer.from(this.state.source, "utf-8");
      const encoded = buf.toString("base64");
      this.setState({ destination: encoded });
    } catch (error) {
      message.error(error.message);
    }
  }
  btnDecodeClicked() {
    try {
      const buf = Buffer.from(this.state.source, "base64");
      const decoded = buf.toString("utf-8");
      this.setState({ destination: decoded });
    } catch (error) {
      message.error(error.message);
    }
  }
  render() {
    return (
      <Row gutter={[8, 8]} align="middle">
        <Col span={24}>
          <TextArea
            value={this.state.source}
            onChange={(e) => this.setState({ source: e.target.value })}
            style={{ height: "200px", resize: "none" }}
            placeholder="Paset plain text or base64 encoded string to here."
          ></TextArea>
        </Col>
        <Col span={24}>
          <Space align={"center"} style={{ width: "100%" }}>
            <Button
              onClick={this.btnEncodeClicked}
              disabled={!this.canEncodeOrDecode}
              type="primary"
            >
              Encode
            </Button>
            <Button
              onClick={this.btnDecodeClicked}
              disabled={!this.canEncodeOrDecode}
              type="primary"
            >
              Decode
            </Button>
            <Button onClick={this.btnClearClicked} disabled={!this.canClear}>
              Clear
            </Button>
          </Space>
        </Col>
        <Col span={24}>
          <TextArea
            value={this.state.destination}
            style={{ height: "200px", resize: "none" }}
            readOnly
            placeholder="Click Encode(Decode) button to Encode(Decode)."
          ></TextArea>
        </Col>
      </Row>
    );
  }
}
