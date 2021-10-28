import React from 'react';
import {Divider, Tag, Space} from 'antd'
function DataType() {
  return (
    <div style={{padding: 20}}>
      <h3>数据类型</h3>
      <Divider plain style={{marginTop: 0}}></Divider>
      <Space>
        原始类型:
        <Tag>String</Tag>
        <Tag>Number</Tag>
        <Tag>Boolean</Tag>
        <Tag>Null</Tag>
        <Tag>Undefined</Tag>
        <Tag>BigInt</Tag>
        <Tag>Symbol</Tag>
      </Space>
      <br />
      <br />
      <Space>
        对象类型:
        <Tag>Objects</Tag>
      </Space>
      <br />
      <br />
      <iframe 
        style={{width: '100%', height: 400}} 
        scrolling="no" 
        title="jsdatatype" 
        frameBorder='0'
        src="https://codepen.io/dagedan/embed/ZEJKMZg?default-tab=js%2Cresult&editable=true&theme-id=dark" 
        loading="lazy">
        See the Pen 
        <a href="https://codepen.io/dagedan/pen/ZEJKMZg">jsdatatype</a> by 越南小商贩 (<a href="https://codepen.io/dagedan">@dagedan</a>)on <a href="https://codepen.io">CodePen</a>.
      </iframe>
    </div>
  );
}

export default DataType;
