import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import {useSelector, shallowEqual} from 'react-redux'
import { ProductsPage } from './products/ProductsPage';
import { ProductEdit } from './products/product-edit/ProductEdit';
import { UsersPage } from './users/UsersPage';
import { ComposePage } from './compose/ComposePage';
import { BulkMessagePage } from './bulk-message/BulkMessagePage';
import { SentMessagesPage } from './sent-messages/SentMessagesPage';
import { ContactsPage } from './contacts/ContactsPage';
import { ContactsGroupPage } from './contactsGroup/ContactsPage';
import { ScheduledMessagesPage } from './scheduled-messages/ScheduledMessagesPage';
import { RequestedMessagesPage } from './requested-messages/RequestedMessagesPage';
import { CreditsPage } from './credits/CreditsPage';
import { ReportsPage } from './reports/ReportsPage';
import { ActivitiesPage } from './activities/ActivitiesPage';
import { LayoutSplashScreen, ContentRoute } from '../../../../_metronic/layout';

export default function ECommercePage() {
  const { user } = useSelector(
    ({ auth }) => ({
      user: auth.user,
    }),
    shallowEqual
  );
 
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      {
         user && user.roleId?.composeMessage ?
         /* Redirect from eCommerce root URL to /user/compose */
         <Redirect exact={true} from="/user" to="/user/compose" />
         : 
         <Redirect exact={true} from="/user" to="/user/sent-messages" />
      }
      <Switch>
        <ContentRoute path="/user/products/new" component={ProductEdit} />
        <ContentRoute path="/user/products/:id/edit" component={ProductEdit} />

        <ContentRoute path="/user/products" component={ProductsPage} />
        <ContentRoute path="/user/users" component={UsersPage} />
        <ContentRoute path="/user/compose" component={ComposePage} />
        <ContentRoute path="/user/bulk-message" component={BulkMessagePage} />
        <ContentRoute path="/user/sent-messages" component={SentMessagesPage} />
        <ContentRoute path="/user/contacts" component={ContactsPage} />
        <ContentRoute path="/user/contacts-group" component={ContactsGroupPage} />

        {/* <ContentRoute
          path="/user/scheduled-messages"
          component={ScheduledMessagesPage}
        /> */}
        <ContentRoute
          path="/user/requested-messages"
          component={RequestedMessagesPage}
        />
        <ContentRoute path="/user/credits" component={CreditsPage} />
        <ContentRoute path="/user/reports" component={ReportsPage} />
        <ContentRoute path="/user/activities" component={ActivitiesPage} />

      </Switch>
    </Suspense>
  );
}
