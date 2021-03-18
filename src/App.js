import { useEffect, isValidElement} from 'react';
import { Button } from 'antd';
import { DemoView } from '@base/demo.js';
import './a.scss';
import outputConfig from './output.json';
import NodeCache from 'node-cache';

const MyCache = new NodeCache();

function App() {

    useEffect(()=>{
        console.log(isValidElement(DemoView))
        MyCache.set('aaa','111');
        console.log(`%c buildTime %c ${outputConfig.buildTime} `,
            'color:#fff;background: #606060;border-radius: 3px 0 0 3px;',
            'color:#fff;background: #1475b2;border-radius: 0 3px 3px 0;');
    },[]);

    return (
        <div className='app'>
            <header className="app-header">
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <Button type="primary" 
                    onClick={ ()=>console.log(MyCache.get('aaa')) }>button</Button>
                <div>
                    12345 
                    <DemoView />
                </div>
            </header>
        </div>
    );
}

export default App;
