import React from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout.tsx";
import ManageLayout from "../layouts/ManageLayout.tsx";
import QuestionLayout from "../layouts/QuestionLayout.tsx";
import Home from "../pages/Home.tsx";
import Login from "../pages/Login.tsx";
import Register from "../pages/Register.tsx";
import NotFound from "../pages/NotFound.tsx";
import List from "../pages/manage/List.tsx";
import Trash from "../pages/manage/Trash.tsx";
import Star from "../pages/manage/Star.tsx";
import Edit from "../pages/question/Edit/index.tsx";
import Stat from "../pages/question/Stat/index.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                path: '/',
                element: <Home/>,
            },
            {
                path: '/login',
                element: <Login/>,
            },
            {
                path: '/register',
                element: <Register/>,
            },
            {
                path: '/manage',
                element: <ManageLayout/>,
                children: [
                    {
                        path: 'list',
                        element: <List/>
                    },
                    {
                        path: 'star',
                        element: <Star/>
                    },
                    {
                        path: 'trash',
                        element: <Trash/>
                    }
                ]
            },
            {
                path: '*',   //404路由配置都写在最后
                element: <NotFound/>
            }
        ]
    },
    {
        path: '/question',
        element: <QuestionLayout/>,
        children: [
            {
                path: 'edit/:id',
                element: <Edit/>
            },
            {
                path: 'stat/:id',
                element: <Stat/>
            }
        ]
    }
])

export default router