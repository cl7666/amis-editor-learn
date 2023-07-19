import { useState } from 'react';
import { Editor } from 'amis-editor';
import { render as renderAmis } from 'amis';
import { SchemaObject } from 'amis/lib/Schema';
import 'amis/lib/themes/default.css';
import 'amis/lib/helper.css';
import 'amis/sdk/iconfont.css';
import 'amis-editor-core/lib/style.css';
import 'amis-ui/lib/themes/cxd.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all';
import './DisabledEditorPlugin'; // 用于隐藏一些不需要的Editor预置组件
export function Amis() {
  const [mobile, setMobile] = useState(false);
  const [preview, setPreview] = useState(false);

  // @ts-ignore
  const defaultSchema: SchemaObject = window['AMIS_JSON'] || {
    type: 'page',
    body: '测试',
    title: '标题',
  };
  const [schema, setSchema] = useState(defaultSchema);

  let obj: any = defaultSchema;

  const onChange = (value: any) => {
    obj = value;
    console.log('change', obj);
  };

  const onSave = () => {
    console.log('保存', obj);
    console.log(schema);
    // @ts-ignore
    window['saveAmis'] && window['saveAmis'](obj);
  };

  const clearJSON = () => {
    const objJson: SchemaObject = {
      type: 'page',
    };
    setSchema(objJson);
  };
  const onGetJson = () => {
    const objJson: SchemaObject = {
      type: 'page',
      body: {
        type: 'form',
        body: [
          {
            type: 'radios',
            name: 'foo',
            label: false,
            options: [
              {
                label: '类型1',
                value: 1,
              },
              {
                label: '类型2',
                value: 2,
              },
            ],
          },
          {
            type: 'input-text',
            name: 'text1',
            label: false,
            placeholder: '选中 类型1 时可见',
            visibleOn: '${foo == 1}',
          },
          {
            type: 'input-text',
            name: 'text2',
            label: false,
            placeholder: '选中 类型2 时不可点',
            disabledOn: '${foo == 2}',
          },
        ],
      },
    };
    setSchema(objJson);
  };

  return (
    <div style={{ height: '100% !important' }}>
      <div
        style={{
          padding: '10px',
          paddingBottom: '0px',
          borderBottom: '1px solid #ddd',
        }}
      >
        <div>
          {renderAmis({
            type: 'form',
            mode: 'inline',
            title: '',
            wrapWithPanel: false,
            body: [
              {
                type: 'tpl',
                tpl: '表单设计器',
              },
              {
                type: 'switch',
                option: '预览',
                name: 'preview',
                className: 'm-l',
                onChange: function (v: any) {
                  console.log(v);
                  setPreview(v);
                },
              },
              {
                type: 'switch',
                option: '移动端',
                name: 'mobile',
                onChange: function (v: any) {
                  console.log(v);
                  setMobile(v);
                },
              },
              {
                type: 'button',
                label: '保存',
                level: 'primary',
                onClick: function () {
                  onSave();
                },
              },
              {
                type: 'button',
                label: '重置',
                level: 'primary',
                onClick: function () {
                  clearJSON();
                },
              },
              {
                type: 'button',
                label: '获取',
                level: 'primary',
                onClick: function () {
                  onGetJson();
                },
              },
            ],
          })}
        </div>
      </div>
      <Editor
        // style={{ height: "calc(100% - 60px) !important" }}
        preview={preview}
        isMobile={mobile}
        onChange={onChange}
        value={schema}
        theme={'cxd'}
        className="is-fixed"
        onSave={onSave}
      />
    </div>
  );
}

export default Amis;
