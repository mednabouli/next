import * as React from 'react';
import { Route, RouteProps, Switch } from 'react-router';
import Header from '../layouts/Header';
import Configurations from './Configurations';
import Debug from './Debug';
import Extension from './Extension';
import Login from './Login';
import Mail from './Mail';
import Seo from './Seo';
import Side from '../layouts/SideBar';
import Upload from './Upload';
import ModuleOpen from './ModuleOpen';
import ModuleDomain from './ModuleDomain';
import { HashRouter } from 'react-router-dom';

type Props = RouteProps;

class App extends React.Component<Props, {}> {
    state = {
    };
    render() {
        return (
            <HashRouter  basename="/">
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route
                        strict
                        path="/"
                        children={() => {
                            return <div className="main-view">
                                <Header/>
                                <div className="right-view">
                                    <Side/>
                                    <div className="view">
                                        <Route exact path="/configurations" component={Configurations}/>
                                        <Route exact path="/seo" component={Seo}/>
                                        <Route exact path="/upload" component={Upload}/>
                                        <Route exact path="/mail" component={Mail}/>
                                        <Route exact path="/debug" component={Debug}/>
                                        <Route exact path="/extension" component={Extension}/>
                                        <Route exact path="/module/open-module" component={ModuleOpen}/>
                                        <Route exact path="/module/domain-config" component={ModuleDomain}/>
                                    </div>
                                </div>
                                </div>;
                        }}
                    />
                </Switch>
            </HashRouter>
        );
    }
}
export default App;