/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl, checkIsActive } from '../../../../_helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faList,
  faUsers,
  faPaperPlane,
  faClock,
  faBell,
  faTasks,
  faCreditCard,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import ReportIcon from '@material-ui/icons/Report';

export function AsideMenuList({ layoutProps }) {
  // Getting the authorized user's data object from store
  const user = useSelector(
    (state) => ({
      user: state.auth.user,
    }),
    shallowEqual
  );

  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu &&
          'menu-item-active'} menu-item-open menu-item-not-hightlighted`
      : '';
  };

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        {/* <li
          className={`menu-item ${getMenuItemActive('/dashboard', false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl('/media/svg/icons/Design/Layers.svg')} />
            </span>
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li> */}
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        {/* <li
          className={`menu-item ${getMenuItemActive("/builder", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/builder">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Library.svg")} />
            </span>
            <span className="menu-text">Layout Builder</span>
          </NavLink>
        </li> */}
        {/*end::1 Level*/}

        {/* Components */}
        {/* begin::section */}

        {/* end:: section */}

        {/* Material-UI */}
        {/*begin::1 Level*/}

        {/*end::1 Level*/}

        {/* Bootstrap */}
        {/*begin::1 Level*/}
        {/*  */}
        {/*end::1 Level*/}

        {/* Applications */}
        {/* begin::section */}
        {/* <li className="menu-section ">
          <h4 className="menu-text">Applications</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li> */}
        {/* end:: section */}

        {/* eCommerce */}
        {/*begin::1 Level*/}
        {/* <li
          className={`menu-item menu-item-submenu ${getMenuItemActive(
            "/admin",
            true
          )}`}
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/admin">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Bag2.svg")} />
            </span>
            <span className="menu-text">Admin</span>
          </NavLink>
          <div className="menu-submenu">
            <i className="menu-arrow" />
            <ul className="menu-subnav">
              <li className="menu-item menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Admin</span>
                </span>
              </li> */}
        {/*begin::2 Level*/}
        {/* <li
                className={`menu-item ${getMenuItemActive(
                  "/admin/customers"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/admin/customers">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Customers</span>
                </NavLink>
              </li> */}
        {/*end::2 Level*/}
        {/*begin::2 Level*/}
        {/* <li
                className={`menu-item ${getMenuItemActive(
                  "/admin/products"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/admin/products">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Products</span>
                </NavLink>
              </li> */}
        {/*end::2 Level*/}
        {/*begin::2 Level*/}
        {/* <li
                className={`menu-item ${getMenuItemActive(
                  "/admin/users" 
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/admin/users">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Users</span>
                </NavLink>
              </li> */}
        {/*end::2 Level*/}
        {/*begin::2 Level*/}
        {/* <li
                className={`menu-item ${getMenuItemActive(
                  "/admin/agencies" 
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/admin/agencies">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Agencies</span>
                </NavLink>
              </li> */}
        {/*end::2 Level*/}
        {/*begin::2 Level*/}
        {/* <li
                className={`menu-item ${getMenuItemActive(
                  "/admin/platform-admins" 
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/admin/platform-admins">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Admins</span>
                </NavLink>
              </li> */}
        {/*end::2 Level*/}
        {/*begin::2 Level*/}
        {/* <li
                className={`menu-item ${getMenuItemActive(
                  "/admin/activities" 
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/admin/activities">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Activities</span>
                </NavLink>
              </li> */}
        {/*end::2 Level*/}
        {/* </ul>
          </div>
        </li> */}
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        {user && user.user.roleId?.composeMessage && (
          <li
            className={`menu-item ${getMenuItemActive('/user/compose', false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/user/compose">
              <span className="svg-icon menu-icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <span className="menu-text">Compose Message</span>
            </NavLink>
          </li>
        )}
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive(
            '/user/sent-messages',
            false
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/user/sent-messages">
            <span className="svg-icon menu-icon">
              <FontAwesomeIcon icon={faPaperPlane} />
            </span>
            <span className="menu-text">Sent Messages</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        {
          user && user.user.roleId?.addContact && (
            <>

<li
          className={`menu-item ${getMenuItemActive('/user/contacts', false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/user/contacts">
            <span className="svg-icon menu-icon">
              <FontAwesomeIcon icon={faUsers} />
            </span>
            <span className="menu-text">Contacts</span>
          </NavLink>
        </li>
        <li
          className={`menu-item ${getMenuItemActive('/user/contacts-group', false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/user/contacts-group">
            <span className="svg-icon menu-icon">
              <FontAwesomeIcon icon={faUsers} />
            </span>
            <span className="menu-text">Contacts Group</span>
          </NavLink>
        </li>
            </>
          )
        }
        
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        {/* <li
          className={`menu-item ${getMenuItemActive(
            '/user/scheduled-messages',
            false
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/user/scheduled-messages">
            <span className="svg-icon menu-icon">
              <FontAwesomeIcon icon={faClock} />
            </span>
            <span className="menu-text">Scheduled Messages</span>
          </NavLink>
        </li> */}
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive('/user/reports', false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/user/reports">
            <span className="svg-icon menu-icon">
              <FontAwesomeIcon icon={faExclamationCircle} />
            </span>
            <span className="menu-text">Report</span>
          </NavLink>
        </li>

        {
          user && user.user.roleId?.composeMessage && (
            <li
            className={`menu-item ${getMenuItemActive(
              '/user/activities',
              false
            )}`}
            aria-haspopup="true" 
          >
            <NavLink className="menu-link" to="/user/activities">
              <span className="svg-icon menu-icon">
                <FontAwesomeIcon icon={faTasks} />
              </span>
              <span className="menu-text">Activities</span>
            </NavLink>
          </li>
          )
        }
       
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        {/* <li
          className={`menu-item ${getMenuItemActive('/user-profile', false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/user-profile">
            <span className="svg-icon menu-icon">
              <SVG
                src={toAbsoluteUrl(
                  '/media/svg/icons/Communication/Add-user.svg'
                )}
              />
            </span>
            <span className="menu-text">User Profile</span>
          </NavLink>
        </li> */}
        {/*end::1 Level*/}

        {/* Custom */}
        {/* begin::section */}
        {/* <li className="menu-section ">
          <h4 className="menu-text">Custom</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li> */}
        {/* end:: section */}

        {/* Error Pages */}
        {/*begin::1 Level*/}
        {/* <li
          className={`menu-item menu-item-submenu ${getMenuItemActive(
            "/error",
            true
          )}`}
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/error">
            <span className="svg-icon menu-icon">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Code/Error-circle.svg")}
              />
            </span>
            <span className="menu-text">Error Pages</span>
            <i className="menu-arrow" />
          </NavLink>
          <div className="menu-submenu ">
            <i className="menu-arrow" />
            <ul className="menu-subnav">
              <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Error Pages</span>
                </span>
              </li> */}

        {/*begin::2 Level*/}
        {/* <li
                className={`menu-item ${getMenuItemActive("/error/error-v1")}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/error/error-v1">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Error Page - 1</span>
                </NavLink>
              </li> */}
        {/*end::2 Level*/}

        {/*begin::2 Level*/}
        {/* <li
                className={`menu-item ${getMenuItemActive("/error/error-v2")}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/error/error-v2">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Error Page -2</span>
                </NavLink>
              </li> */}
        {/*end::2 Level*/}

        {/*begin::2 Level*/}
        {/* <li
                className={`menu-item ${getMenuItemActive("/error/error-v3")}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/error/error-v3">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Error Page - 3</span>
                </NavLink>
              </li> */}
        {/*end::2 Level*/}

        {/*begin::2 Level*/}
        {/* <li
                className={`menu-item ${getMenuItemActive("/error/error-v4")}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/error/error-v4">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Error Page - 4</span>
                </NavLink>
              </li> */}
        {/*end::2 Level*/}

        {/*begin::2 Level*/}
        {/* <li
                className={`menu-item ${getMenuItemActive("/error/error-v5")}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/error/error-v5">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Error Page - 5</span>
                </NavLink>
              </li> */}
        {/*end::2 Level*/}

        {/*begin::2 Level*/}
        {/* <li
                className={`menu-item ${getMenuItemActive("/error/error-v6")}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/error/error-v6">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Error Page - 6</span>
                </NavLink>
              </li> */}
        {/*end::2 Level*/}
        {/* </ul>
          </div>
        </li> */}
        {/*end::1 Level*/}
      </ul>

      {/* end::Menu Nav */}
    </>
  );
}
