import React, { useRef, useState } from 'react';
import {useStore} from 'effector-react'
import { Menu, Button, Layout } from 'antd';
import useMount from 'ahooks/es/useMount';
import useSafeState from 'ahooks/es/useSafeState';
import useEventListener from 'ahooks/es/useEventListener';
import {coreMenu} from '../../data/coreMenu';
import {$hashTag} from '../../store/dataSource'
const { SubMenu } = Menu;
import styles from './Core.module.css';
import {elementPosition} from '@/utils/common';

import { Desktop, Tablet, Mobile, Default} from '@/utils/responsive'

interface Children {
  id: string;
  y: number;
  offsetHeight: number;
}
function Core() {
  const hashTag = useStore($hashTag)
  const [selectedKey, setSelectedKey] = useSafeState(['datatype1'])
  const [childrenDomScrollPos,setChildrenDomScrollPos ] = useSafeState<Children[]>([])
  const refContainer:any = useRef();
  const {Sider, Content } = Layout;
  useMount(() => {
    setTimeout(() => {
      if (hashTag) {
        const position = elementPosition(document.getElementById(hashTag)).y
        refContainer.current.scrollTop = position - 102
      }
    }, 0);
    console.log(refContainer.current.scrollTop)
    setChildrenDomScrollPos(Object.values(refContainer.current.children).map((element:any) => {
      return {id:element.id, y:elementPosition(element).y, offsetHeight: element.offsetHeight}
    }))
    
    setSelectedKey([hashTag])
  })
  useEventListener('scroll', e => {
    for(let i of childrenDomScrollPos) {
      let bottom = i.y - 102
      let top = i.y - i.offsetHeight - 102
      if (refContainer.current.scrollTop > top && refContainer.current.scrollTop < bottom) {
        setSelectedKey([i.id])
        window.location.hash = i.id
        continue
      }
    }
  }, { target: refContainer });
  const menuItemClick = (e:any) => {
    setSelectedKey([e.key])
  }

  return (
      <Desktop>
        <Layout style={{background:'white',flex: 1,marginTop:20}}>
          <Layout style={{background:'white'}}>
            <Sider className={styles.aside}>
              <Menu
                mode="inline"
                theme="light"
                className={styles.menu}
                selectedKeys={selectedKey}
                onClick={menuItemClick}
              >
              {
                coreMenu.map(i => {
                  return <Menu.ItemGroup key={i.key} title={i.title}>
                    {i.children.map(item => {
                      return <Menu.Item key={item.key}><a href={`#${item.key}`}>{item.title}</a></Menu.Item>
                    })}
                  </Menu.ItemGroup>
                })
              }
              </Menu>
            </Sider>
            <Content style={{height: "100%"}}>
              <div style={{overflowY:'auto', height: "100%"}} ref={refContainer}>
                <div id='datatype1' style={{height: '700px'}}>数据类型</div>
                <div id='datatype2' style={{height: '700px'}}>类型转化</div>
                <div id='datatype3' style={{height: '700px'}}>类型判断</div>
                <div id='base1' style={{height: '700px'}}>this</div>
                <div id='base2' style={{height: '700px'}}>闭包</div>
                <div id='base3' style={{height: '700px'}}>作用域</div>
                <div id='base4' style={{height: '700px'}}>变量提升</div>
                <div id='garble1' style={{height: '700px'}}>new</div>
                <div id='garble2' style={{height: '700px'}}>call/apply/bind</div>
                <div id='garble3' style={{height: '700px'}}>原型</div>
                <div id='garble4' style={{height: '700px'}}>class</div>
                <div id='garble5' style={{height: '700px'}}>继承</div>
                <div id='garble6' style={{height: '700px'}}>模块化</div>
                <div id='dev1' style={{height: '700px'}}>promise</div>
                <div id='dev2' style={{height: '700px'}}>迭代器生成器</div>
                <div id='dev3' style={{height: '700px'}}>async/await</div>
                <div id='theory1' style={{height: '700px'}}>事件循环</div>
                <div id='theory2' style={{height: '700px'}}>节流和防抖</div>
                <div id='theory3' style={{height: '700px'}}>柯里化</div>
                <div id='theory4' style={{height: '700px'}}>垃圾回收</div>
                <div id='theory5' style={{height: '700px'}}>设计模式</div>
                <div id='theory6' style={{height: '700px'}}>其他知识点</div>
                <div id='html1' style={{height: '700px'}}>语义化</div>
                <div id='css1' style={{height: '700px'}}>盒子模型</div>
                <div id='css2' style={{height: '700px'}}>选择器</div>
                <div id='css3' style={{height: '700px'}}>flex</div>
                <div id='css4' style={{height: '700px'}}>grid</div>
                <div id='css5' style={{height: '700px'}}>其他</div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Desktop>
  );
}

export default Core;
