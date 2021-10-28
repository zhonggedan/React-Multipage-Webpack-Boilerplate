import React from 'react';
import {
  NavLink,
} from "react-router-dom";
import { Row, Col } from 'antd';
import styles from './NavBar.module.css';

import { Desktop, Tablet, Mobile, Default} from '@/utils/responsive'
function NavBar() {
  return (
      <Desktop>
        <div>
          <Row style={{display: 'flex'}} className={styles.nav}>
            <Col span={4}>
              <h1 style={{marginLeft: 20}}>知识体系</h1>
            </Col>
            <Col flex={1}></Col>
            <Col>
              <NavLink to="/LearnPage/home" className={styles.navItem} activeStyle={{color: '#1890ff'}}>核心知识 </NavLink>
              <NavLink to="/LearnPage/frame" className={styles.navItem} activeStyle={{color: '#1890ff'}}>框架</NavLink>
              <NavLink to="/LearnPage/react" className={styles.navItem} activeStyle={{color: '#1890ff'}}>React</NavLink>
              <NavLink to="/LearnPage/vue" className={styles.navItem} activeStyle={{color: '#1890ff'}}>Vue</NavLink>
              <NavLink to="/LearnPage/browser" className={styles.navItem} activeStyle={{color: '#1890ff'}}>浏览器</NavLink>
              <NavLink to="/LearnPage/performance" className={styles.navItem} activeStyle={{color: '#1890ff'}}>性能优化</NavLink>
              <NavLink to="/LearnPage/micro" className={styles.navItem} activeStyle={{color: '#1890ff'}}>微前端</NavLink>
              <NavLink to="/LearnPage/other" className={styles.navItem} activeStyle={{color: '#1890ff'}}>其他杂项</NavLink>
            </Col>
          </Row>
        </div>
      </Desktop>
  );
}

export default NavBar;
