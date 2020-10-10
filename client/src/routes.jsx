import React from "react"
import  { Switch, Route, Redirect } from 'react-router-dom'
import AuthPage from "./pages/AuthPage"
import CratePage from "./pages/CreatePage"
import DetailPage from "./pages/DetailPage"
import LinksPage from "./pages/LinksPage"

export const useRouter = (isAuth) => {
    if (isAuth) {
        return <Switch>
            <Route path={'/create'} exact>
                <CratePage />
            </Route>
            <Route path={'/details/:id'}>
                <DetailPage />
            </Route>
            <Route path={'/links'} exact>
                <LinksPage />
            </Route>
            <Redirect to={'/create'} />
        </Switch>
    }
    return <Switch>
        <Route path={'/'} exact>
            <AuthPage />
        </Route>
        <Redirect to={'/'} />
    </Switch>
}