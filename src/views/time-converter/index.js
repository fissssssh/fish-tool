import "./index.css";
import {
  Button,
  Col,
  DatePicker,
  Input,
  Row,
  Typography,
  Space,
  message,
} from "antd";
import moment from "moment";
import React from "react";
const { Text } = Typography;

export default class TimeConverter extends React.Component {
  constructor(props) {
    super(props);
    let now = moment.utc();
    this.state = {
      utcTime: now,
      localTime: moment(now).local(),
      unixTimeMilliseconds: now.valueOf(),
      unixTimeSeconds: now.unix(),
    };
  }
  btnConvertClicked(from) {
    try {
      console.log(from);
      debugger;
      let utc = null;
      switch (from) {
        case "UnixTimeMilliseconds":
          utc = moment.utc(this.state.unixTimeMilliseconds);
          break;
        case "UnixTimeSeconds":
          utc = moment.unix(this.state.unixTimeSeconds).utc();
          break;
        case "UtcTime":
          utc = moment.utc(this.state.utcTime);
          break;
        case "LocalTime":
          utc = moment.utc(this.state.localTime);
          break;
        default:
          throw Error(`Unknow source: ${from}`);
      }
      this.setState({
        utcTime: utc,
        localTime: moment(utc).local(),
        unixTimeMilliseconds: utc.valueOf(),
        unixTimeSeconds: utc.unix(),
      });
    } catch (error) {
      message.error(error.message);
    }
  }
  render() {
    return (
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Space>
            <Text className="label">Unix Time (ms)</Text>
            <Input
              type="number"
              min={0}
              value={this.state.unixTimeMilliseconds}
              onChange={(e) =>
                this.setState({ unixTimeMilliseconds: Number(e.target.value) })
              }
            />
            <Button
              onClick={() => this.btnConvertClicked("UnixTimeMilliseconds")}
            >
              Convert
            </Button>
          </Space>
        </Col>

        <Col span={24}>
          <Space>
            <Text className="label">Unix Time (s)</Text>
            <Input
              type="number"
              min={0}
              value={this.state.unixTimeSeconds}
              onChange={(e) =>
                this.setState({ unixTimeSeconds: Number(e.target.value) })
              }
            />
            <Button onClick={() => this.btnConvertClicked("UnixTimeSeconds")}>
              Convert
            </Button>
          </Space>
        </Col>

        <Col span={24}>
          <Space>
            <Text className="label">Time (UTC) </Text>
            <DatePicker
              showTime
              value={this.state.utcTime}
              onChange={(value) => this.setState({ utcTime: value })}
            ></DatePicker>
            <Button onClick={() => this.btnConvertClicked("UtcTime")}>
              Convert
            </Button>
          </Space>
        </Col>
        <Col span={24}>
          <Space>
            <Text className="label">Time (Local) </Text>
            <DatePicker
              showTime
              value={this.state.localTime}
              onChange={(value) => this.setState({ localTime: value })}
            ></DatePicker>
            <Button onClick={() => this.btnConvertClicked("LocalTime")}>
              Convert
            </Button>
          </Space>
        </Col>
      </Row>
    );
  }
}
