import "./index.css";
import React from "react";

import CropperJs from "cropperjs";
import "cropperjs/dist/cropper.css";
import { Button, Col, Row, Space, Upload, message } from "antd";
import { RedoOutlined } from "@ant-design/icons";
export default class Cropper extends React.Component {
  constructor(props) {
    super(props);
    this.cropperImgRef = React.createRef();
    this.cropper = null;
    this.state = {
      imgSrc: null,
      previewImg: null,
      previewImgWidth: 256,
      previewImgHeight: 144,
    };
    this.btnImportClicked = this.btnImportClicked.bind(this);
    this.btnRotateClicked = this.btnRotateClicked.bind(this);
    this.btnSaveClicked = this.btnSaveClicked.bind(this);
  }
  componentWillUnmount() {
    if (this.cropper) {
      this.cropper.destroy();
    }
  }
  btnImportClicked(file) {
    try {
      const fr = new FileReader();
      fr.onload = (e) => {
        if (this.cropper) this.cropper.destroy();
        this.setState({ imgSrc: e.target.result, previewImg: null });
        const cropper = new CropperJs(this.cropperImgRef.current, {
          viewMode: 3,
          dragMode: "move",
          cropend: (e) => {
            const cropped = this.cropper
              .getCroppedCanvas()
              .toDataURL("image/jpeg");
            const cropBoxData = this.cropper.getCropBoxData();
            const aspectRatio = cropBoxData.width / cropBoxData.height;
            let previewWidth = 256,
              previewHeight = 144;
            if (aspectRatio >= 1.78) {
              previewHeight = previewWidth / aspectRatio;
            } else {
              previewWidth = previewHeight * aspectRatio;
            }
            this.setState({
              previewImg: cropped,
              previewImgHeight: previewHeight,
              previewImgWidth: previewWidth,
            });
          },
          zoom: () => {
            const cropped = this.cropper
              .getCroppedCanvas()
              .toDataURL("image/jpeg");
            this.setState({ previewImg: cropped });
          },
          ready: () => {
            const cropped = this.cropper
              .getCroppedCanvas()
              .toDataURL("image/jpeg");
            this.setState({ previewImg: cropped });
          },
        });

        this.cropper = cropper;
      };
      fr.readAsDataURL(file);
    } catch (error) {
      message.error(error.message);
    } finally {
      // stop upload and don't show in upload list.
      return Upload.LIST_IGNORE;
    }
  }
  btnRotateClicked() {
    if (this.cropper) {
      this.cropper.rotate(45);
    }
  }
  btnSaveClicked() {
    if (this.cropper) {
      const aTag = document.createElement("a");
      aTag.href = this.cropper.getCroppedCanvas().toDataURL("image/png");
      aTag.download = `${new Date().getTime()}.png`;
      aTag.click();
    }
  }
  render() {
    return (
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Space>
            <Upload accept="image/*" beforeUpload={this.btnImportClicked}>
              <Button>Import</Button>
            </Upload>
            <Button type="primary" onClick={this.btnSaveClicked}>
              Save
            </Button>
            <Button shape="circle" onClick={this.btnRotateClicked}>
              <RedoOutlined />
            </Button>
          </Space>
        </Col>
        <Col sm={24} md={18}>
          <div>
            <img
              ref={this.cropperImgRef}
              src={this.state.imgSrc}
              alt=""
              style={{ display: "block", maxWidth: "100%" }}
            ></img>
          </div>
        </Col>
        <Col sm={24} md={6}>
          <div
            className="img-preview preview-lg"
            style={{
              width: `${this.state.previewImgWidth}px`,
              height: `${this.state.previewImgHeight}px`,
            }}
          >
            <img src={this.state.previewImg} alt=""></img>
          </div>
          <div
            className="img-preview preview-md"
            style={{
              width: `${this.state.previewImgWidth / 2}px`,
              height: `${this.state.previewImgHeight / 2}px`,
            }}
          >
            <img src={this.state.previewImg} alt=""></img>
          </div>
          <div
            className="img-preview preview-sm"
            style={{
              width: `${this.state.previewImgWidth / 4}px`,
              height: `${this.state.previewImgHeight / 4}px`,
            }}
          >
            <img src={this.state.previewImg} alt=""></img>
          </div>
          <div
            className="img-preview preview-xs"
            style={{
              width: `${this.state.previewImgWidth / 8}px`,
              height: `${this.state.previewImgHeight / 8}px`,
            }}
          >
            <img src={this.state.previewImg} alt=""></img>
          </div>
        </Col>
      </Row>
    );
  }
}
