import React from 'react'
import { Menu, Layout } from 'antd';
import { EuroCircleOutlined, BookOutlined, DesktopOutlined, ThunderboltOutlined, HomeOutlined, RocketOutlined, GithubFilled, LinkedinFilled } from '@ant-design/icons';
import { BrowserRouter as Router, Switch, Route, Link, BrowserRouter } from 'react-router-dom'


const { Sider } = Layout;

function Nav() {

  return (
    <Sider
    breakpoint ="md"
    collapsedWidth = {0}

    >
      <Menu theme="dark" mode="inline" style={{ paddingTop: 60, width: 200, height: "100%" }}>
        
        <Menu.Item key="0" style={{ height: 50, marginBottom: 70 }} icon={<HomeOutlined style={{ fontSize: 50 }} />}>
          <Link to='/' />
        </Menu.Item>
        <Menu.Item key="1" icon={<BookOutlined style={{ fontSize: 25}} />} style={{ height: 75, fontSize: 20 }}  >
          <Link to='/education'>Education</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined style={{ fontSize: 25 }} />} style={{ height: 75, fontSize: 20 }}>
          <Link to='/projets'>Projets</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<EuroCircleOutlined style={{ fontSize: 25 }} />} style={{ height: 100, fontSize: 20}}>
          <Link to='/pro'>Expériences <br />professionnelles</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<RocketOutlined style={{ fontSize: 25 }} />} style={{ height: 100, fontSize: 20 }}  >
          <Link to='/perso'>Expériences <br /> personnelles</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<ThunderboltOutlined style={{ fontSize: 25 }} />} style={{ height: 75, fontSize: 20 }}  >
          <Link to='/game'>Game Zone</Link>
        </Menu.Item>
        <Menu.Item key="6" style={{marginTop: 40, height: 75}}>
        <a href="https://github.com/JPotel38" target="_blank" rel="noopener noreferrer"><GithubFilled style={{ color: '#92D050', fontSize: 60, marginRight: 20 }} /></a>
        <a href="https://www.linkedin.com/in/jérémy-potel/" target="_blank" rel="noopener noreferrer"><LinkedinFilled style={{ color: 'blue', fontSize: 60 }} /></a>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Nav