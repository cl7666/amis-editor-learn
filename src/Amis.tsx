import { useState } from 'react'
import { Editor } from 'amis-editor'
import { SchemaObject } from 'amis/lib/Schema'
import { render as renderAmis } from 'amis'
import type { Schema } from 'amis/lib/types'
import './DisabledEditorPlugin' // 用于隐藏一些不需要的Editor预置组件
import 'amis/lib/themes/default.css'
import 'amis/lib/helper.css'
import 'amis/sdk/iconfont.css'
import 'amis-editor-core/lib/style.css'
import 'amis-ui/lib/themes/cxd.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all'

type Props = {
  defaultPageConfig?: Schema
  codeGenHandler?: (codeObject: Schema) => void
  pageChangeHandler?: (codeObject: Schema) => void
}

export function Amis(props: Props) {
  const [mobile, setMobile] = useState(false)
  const [preview, setPreview] = useState(false)
  const [defaultPageConfig] = useState<Schema>(props.defaultPageConfig as any) // 传入配置

  // @ts-ignore
  const defaultSchema: Schema | SchemaObject = defaultPageConfig || {
    type: 'page',
    body: '',
    regions: ['body'],
    asideResizor: false,
  }
  const [schema, setSchema] = useState(defaultSchema)

  let obj: Schema = defaultSchema

  const onChange = (value: Schema) => {
    obj = value
    console.log('change', obj)
    props.pageChangeHandler && props.pageChangeHandler(value)
  }

  const onSave = () => {
    console.log('保存', obj)
    console.log(schema)
    props.codeGenHandler && props.codeGenHandler(obj)
  }

  const clearJSON = () => {
    obj = {
      type: 'page',
    }
    setSchema(obj)
  }
  const onGetJson = () => {
    obj = {
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
    }
    setSchema(obj)
  }

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          borderBottom: '1px solid #ddd',
        }}
      >
        {renderAmis({
          type: 'form',
          mode: 'inline',
          title: '',
          className: 'p-t p-l p-r',
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
                setPreview(v)
              },
            },
            {
              type: 'switch',
              option: '移动端',
              name: 'mobile',
              onChange: function (v: any) {
                setMobile(v)
              },
            },
            {
              type: 'button',
              label: '保存',
              level: 'primary',
              onClick: function () {
                onSave()
              },
            },
            {
              type: 'button',
              label: '重置',
              level: 'primary',
              onClick: function () {
                clearJSON()
              },
            },
            {
              type: 'button',
              label: '获取',
              level: 'primary',
              onClick: function () {
                onGetJson()
              },
            },
          ],
        })}
      </div>
      <>
        {schema ? (
          <Editor
            // style={{ height: "calc(100% - 60px) !important" }}
            preview={preview}
            isMobile={mobile}
            onChange={onChange}
            value={schema as SchemaObject}
            theme={'cxd'}
            // className="is-fixed"
            onSave={onSave}
          />
        ) : null}
      </>
    </div>
  )
}

export default Amis
