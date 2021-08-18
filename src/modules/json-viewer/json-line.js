import React from "react";
import "./json-line.css";
import { Typography, Space, Tag } from "antd";
const { Text } = Typography;

export default function JsonLine(props) {
  let jsonValue;
  if (props.value) {
    let displayValue = props.value.toString();
    if (props.propertyType === "string") {
      displayValue = `"${displayValue}"`;
    }
    jsonValue = <Text className={"json-value-" + props.propertyType}>{displayValue}</Text>;
  }
  return (
    <Space size="small">
      <Text strong>{props.propertyName}</Text>
      <Tag>{props.propertyType}</Tag>
      {props.value && <Text strong>:</Text>}
      {jsonValue}
    </Space>
  );
}
