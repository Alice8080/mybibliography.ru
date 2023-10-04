import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import { Icon } from '@iconify/react';
import './sidebar.scss';

const Sidebar = () => {
    const [state, setState] = React.useState({
        right: false
    });

    const links = [
        {
            text: 'Перейти в список литературы',
            link: 'spisok-literatury',
            icon: "system-uicons:list"
        },
        {
            text: 'Заказать список литературы',
            link: 'zakazat-spisok-literatury',
            icon: "system-uicons:check"
        },
        {
            text: 'Найти источники',
            link: 'search',
            icon: "system-uicons:search"
        },
        {
            text: 'Оформить ссылку',
            link: 'tip-dokumenta',
            icon: "system-uicons:create"
        },
        {
            text: 'Личный кабинет',
            link: 'account',
            icon: "system-uicons:user-male-circle"
        },
    ];

    const linksAbout = [
        {
            text: 'О нас',
            link: 'about',
            icon: "system-uicons:info-circle"
        },
        {
            text: 'Контакты',
            link: 'kontakty',
            icon: "system-uicons:mail"
        },
        {
            text: 'Правовая информация',
            link: 'pravovaya-informaciya',
            icon: "system-uicons:document"
        },
    ];

    const help = [
        {
            text: 'Помощь с курсовыми, контрольными, дипломами',
            link: 'help',
            icon: "system-uicons:document-stack"
        },
    ];

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            className='sidebar'
        >
            <List className='sidebar__list'>
                <ListItem>
                    <button onClick={toggleDrawer(anchor, false)} className='sidebar__close'>
                        <Icon icon="system-uicons:cross" />
                    </button>
                </ListItem>
                {links.map(({ text, link, icon }, index) => (
                    <ListItem key={index} disablePadding className='sidebar__item'>
                        <a href={link}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Icon icon={icon} />
                                </ListItemIcon>
                                {text}
                            </ListItemButton>
                        </a>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List className='sidebar__list'>
                {linksAbout.map(({ text, link, icon }, index) => (
                    <ListItem key={index} disablePadding className='sidebar__item'>
                        <a href={link}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Icon icon={icon} />
                                </ListItemIcon>
                                {text}
                            </ListItemButton>
                        </a>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List className='sidebar__list'>
                {help.map(({ text, link, icon }, index) => (
                    <ListItem key={index} disablePadding className='sidebar__item'>
                        <a href={link}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Icon icon={icon} />
                                </ListItemIcon>
                                {text}
                            </ListItemButton>
                        </a>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const anchor = 'right';

    return (
        <div>
            <React.Fragment>
                <IconButton onClick={toggleDrawer(anchor, true)} aria-label="Открыть меню">
                    <Icon icon="system-uicons:menu-hamburger" />
                </IconButton>
                <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}>
                    {list(anchor)}
                </Drawer>
            </React.Fragment>
        </div>
    );
}

export default Sidebar;