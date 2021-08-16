import React from 'react'
import {Layout, Menu} from 'antd';
import {HomeOutlined, GithubFilled, LinkedinFilled} from '@ant-design/icons';
import {Link} from 'react-router-dom'

const {Sider} = Layout;

export default function Nav() {

    return (
        <Sider
            breakpoint="md"
            collapsedWidth={0}>
            <Menu mode="inline" style={{paddingTop: 60, width: '100%'}}>
                <Menu.Item key="0" style={{height: 50, marginBottom: 50}} icon={<HomeOutlined style={{fontSize: 50}}/>}>
                    <Link to='/Portfolio'/>
                </Menu.Item>
                <Menu.Item key="1"><Link to='/education'>Education</Link>
                </Menu.Item>
                <Menu.Item key="2"><Link to='/projets'>Projets</Link>
                </Menu.Item>
                <Menu.Item key="3"><Link to='/pro'>Emplois</Link>
                </Menu.Item>
                <Menu.Item key="4"><Link to='/perso'>Projets personnels</Link>
                </Menu.Item>
                <Menu.Item key="5"><Link to='/game'>Game Zone</Link>
                </Menu.Item>
                <Menu.Item key="6">
                    <GithubFilled id="github-icon"/>
                    <a href="https://github.com/JPotel38" target="_blank" rel="noopener noreferrer">Github</a>
                </Menu.Item>
                <Menu.Item key="7">
                    <LinkedinFilled id="linkedin-icon"/>
                    <a href="https://www.linkedin.com/in/jérémy-potel/" target="_blank" rel="noopener noreferrer">
                        LinkedIn</a>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}
