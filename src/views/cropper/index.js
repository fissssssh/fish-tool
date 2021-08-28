import "./index.css";
import React from "react";

import CropperJs from "cropperjs";
import "cropperjs/dist/cropper.css";
import { Button, Col, Row, Space, Upload, message } from "antd";
import IconFont from "../../plugins/iconfont";
export default class Cropper extends React.Component {
  constructor(props) {
    super(props);
    this.cropperImgRef = React.createRef();
    this.cropper = null;
    this.scaleX = 1;
    this.scaleY = 1;
    this.state = {
      imgSrc: null,
      previewImg: null,
      previewImgWidth: 256,
      previewImgHeight: 144,
    };
  }
  componentWillUnmount() {
    if (this.cropper) {
      this.cropper.destroy();
      this.cropper = null;
    }
  }
  btnImportClicked(file) {
    try {
      const fr = new FileReader();
      fr.onload = (e) => {
        if (this.cropper) {
          this.cropper.destroy();
          this.cropper = null;
        }
        this.setState({ imgSrc: e.target.result, previewImg: null });
        const cropper = new CropperJs(this.cropperImgRef.current, {
          viewMode: 0,
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
  btnRotateClicked(deg) {
    if (this.cropper) {
      this.cropper.rotate(deg);
    }
  }
  btnFlipClicked(orientation) {
    if (!this.cropper) {
      return;
    }
    if (orientation === "vertical") {
      this.scaleY *= -1;
      this.cropper.scaleY(this.scaleY);
    } else if (orientation === "horizontal") {
      this.scaleX *= -1;
      this.cropper.scaleX(this.scaleX);
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
        <Col xs={12} sm={12} md={9}>
          <Space>
            <Upload
              accept="image/*"
              beforeUpload={(file) => this.btnImportClicked(file)}
            >
              <Button>Import</Button>
            </Upload>
            <Button type="primary" onClick={() => this.btnSaveClicked()}>
              Save
            </Button>
          </Space>
        </Col>
        {this.cropper && (
          <Col xs={12} sm={12} md={9} style={{ textAlign: "right" }}>
            <Space>
              <Button shape="circle" onClick={() => this.btnRotateClicked(-45)}>
                <IconFont type="icon-fanzhuannishizhen" />
              </Button>
              <Button shape="circle" onClick={() => this.btnRotateClicked(45)}>
                <IconFont type="icon-fanzhuanshunshizhen" />
              </Button>
              <Button
                shape="circle"
                onClick={() => this.btnFlipClicked("vertical")}
              >
                <IconFont type="icon-chuizhifanzhuan" />
              </Button>
              <Button
                shape="circle"
                onClick={() => this.btnFlipClicked("horizontal")}
              >
                <IconFont type="icon-shuipingfanzhuan" />
              </Button>
            </Space>
          </Col>
        )}

        <Col xs={24} sm={24} md={18}>
          <div>
            <img
              ref={this.cropperImgRef}
              src={this.state.imgSrc}
              alt=""
              style={{ display: "block", maxWidth: "100%", maxHeight: "500px" }}
            ></img>
          </div>
        </Col>
        <Col xs={24} sm={24} md={6}>
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
