import React from "react";
import "./json-line.css";
import { Typography, Space, Tag } from "antd";
import PropTypes from "prop-types";
const { Text } = Typography;
const typeColorMap={
  "null":"red",
  "object":"blue",
  "array":"purple",
  "string":"orange",
  "number":"magenta",
  "boolean":"cyan"
}
export default class JsonLine extends React.Component {
  render() {
    const { name, type, value, itemsLength } = this.props;
    return (
      <Space size="small">
        <Text strong>{name}</Text>
        <Tag color={typeColorMap[type]}>{type}</Tag>
        {value && <Text strong> : </Text>}
        {value && (
          <Text class={`json-value-${type}`}>
            {type === "string" ? `"${value}"` : value}
          </Text>
        )}
        {itemsLength && type === "object" && (
          <Text>{`{ ... ${itemsLength} items }`}</Text>
        )}
        {itemsLength && type === "array" && (
          <Text>{`[ ... ${itemsLength} items ]`}</Text>
        )}
      </Space>
    );
  }
}

JsonLine.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  itemsLength: PropTypes.number,
};
