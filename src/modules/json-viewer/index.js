import React from "react";
import { Row, Col, Input } from "antd";
const { TextArea } = Input;
class JsonViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "12" };
  }
  render() {
    return (
      <Row>
        <Col span={12}>
          <TextArea rows={20} value={this.state.input} onChange={(e) => this.setState({ input: e.target.value })} />
        </Col>
        <Col span={12}>{this.state.input}</Col>
      </Row>
    );
  }
}

export default JsonViewer;
