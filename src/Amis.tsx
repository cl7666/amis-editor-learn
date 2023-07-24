import { useEffect, useState } from 'react'
import { Editor } from 'amis-editor'
import { SchemaObject } from 'amis'
import { render as renderAmis } from 'amis'
import { message } from 'antd'
import type { Schema } from 'amis/lib/types'

import './DisabledEditorPlugin' // 用于隐藏一些不需要的Editor预置组件
import 'amis/lib/themes/default.css'
import 'amis/lib/helper.css'
import 'amis/sdk/iconfont.css'
import 'amis-editor-core/lib/style.css'
import 'amis-ui/lib/themes/cxd.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all'
import { getDetail, saveELement, DelElement } from './request/api'

export function Amis() {
  const [mobile, setMobile] = useState(false)
  const [preview, setPreview] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  // const [delId, setDelId] = useState('')
  // @ts-ignore
  const defaultSchema: Schema | SchemaObject = {
    type: 'page',
    body: '',
    regions: ['body'],
    asideResizor: false,
  }
  const [schema, setSchema] = useState(defaultSchema)

  useEffect(() => {
    getEfDetail()
  }, [])
  // 点击验证码图片的事件函数
  const getEfDetail = () => {
    getDetail().then((res: any) => {
      if (res.data) {
        // setDelId(res.data.id)
        obj = JSON.parse(res.data.dataJson)
        setSchema(JSON.parse(res.data.dataJson))
      }
    })
  }

  // 点击验证码图片的事件函数
  const saveEFform = (schema: Schema) => {
    const data = new FormData()
    data.append('json', JSON.stringify(schema))
    saveELement(data).then((res: any) => {
      console.log(res)
      messageApi.open({
        type: 'success',
        content: '保存成功',
        duration: 3,
        style: {
          marginTop: '5vh',
        },
      })
    })
  }

  // // 点击验证码图片的事件函数
  // const delEFform = (delId: string) => {
  //   const data = new FormData()
  //   data.append('id', delId)
  //   DelElement(data).then((res: any) => {
  //     console.log(res)
  //   })
  // }

  let obj: Schema = defaultSchema

  const onChange = (value: Schema) => {
    console.log(obj)
    obj = value
    setSchema(obj)
  }

  const onSave = () => {
    saveEFform(schema)
  }

  const clearJSON = () => {
    obj = {
      type: 'page',
      body: '',
      regions: ['body'],
      asideResizor: false,
    }
    setSchema(obj)
    messageApi.open({
      type: 'info',
      content: '重置成功',
      duration: 3,
      style: {
        marginTop: '5vh',
      },
    })
    // onSave()
  }
  // const onGetJson = () => {
  //   obj = {
  //     type: 'page',
  //     body: {
  //       type: 'form',
  //       body: [
  //         {
  //           type: 'radios',
  //           name: 'foo',
  //           label: false,
  //           options: [
  //             {
  //               label: '类型1',
  //               value: 1,
  //             },
  //             {
  //               label: '类型2',
  //               value: 2,
  //             },
  //           ],
  //         },
  //         {
  //           type: 'input-text',
  //           name: 'text1',
  //           label: false,
  //           placeholder: '选中 类型1 时可见',
  //           visibleOn: '${foo == 1}',
  //         },
  //         {
  //           type: 'input-text',
  //           name: 'text2',
  //           label: false,
  //           placeholder: '选中 类型2 时不可点',
  //           disabledOn: '${foo == 2}',
  //         },
  //       ],
  //     },
  //   }
  //   setSchema(obj)
  // }

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
                getEfDetail()
                // onGetJson()
              },
            },
          ],
        })}
      </div>
      <>
        {contextHolder}
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
