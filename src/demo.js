
import { cloneElement, memo, useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import css from './demo.module.less';
import classNames from 'classnames';
import { Modal } from 'antd';

export const DemoView = () => {
    const [count, set] = useState(0);
    const [aaa] = useState({ id: 1 })
    return (
        <div className={css.demo}>
            DemoView
            <div>
                <Azzz onOk={() => console.log(aaa)} className='aaa' >
                    <span><em>del</em></span>
                </Azzz>
            </div>
            <div onClick={() => set(() => count + 1)}>
                {count}
            </div>
        </div>
    );
};

const _ConfirmBtn = ({ onOk, children, className, title, content, okType, onCancel }) => {
    console.log('render');
    const handleClick = (e) => {
        e.stopPropagation();
        Modal.confirm({
            title: title || '您确定要执行该操作吗？',
            icon: <ExclamationCircleOutlined />,
            content: content || '请谨慎执行该操作！',
            okType,
            onOk,
            onCancel
        });
    }
    return cloneElement(children, { onClick: handleClick, className: classNames(children.props.className || '', className) });
}

const Azzz = memo(_ConfirmBtn, (a, b) => true);