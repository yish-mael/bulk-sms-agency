/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import objectPath from 'object-path';
import ApexCharts from 'apexcharts';
import { DropdownCustomToggler, DropdownMenu2 } from '../../dropdowns';
import { useHtmlClassService } from '../../../layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleArrows } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { Group, LocalActivity } from '@material-ui/icons';
import { Typography } from '@material-ui/core';

export function CustomMixedWidget({ className, chartColor = 'danger' }) {
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      colorsGrayGray500: objectPath.get(
        uiService.config,
        'js.colors.gray.gray500'
      ),
      colorsGrayGray200: objectPath.get(
        uiService.config,
        'js.colors.gray.gray200'
      ),
      colorsThemeBaseColor: objectPath.get(
        uiService.config,
        `js.colors.theme.base.${chartColor}`
      ),
      colorsThemeLightColor: objectPath.get(
        uiService.config,
        `js.colors.theme.light.${chartColor}`
      ),
      fontFamily: objectPath.get(uiService.config, 'js.fontFamily'),
    };
  }, [uiService, chartColor]);

  //   useEffect(() => {
  //     const element = document.getElementById('kt_custom_mixed_widget_1_chart');

  //     if (!element) {
  //       return;
  //     }

  //     const options = getChartOption(layoutProps);
  //     const chart = new ApexCharts(element, options);
  //     chart.render();
  //     return function cleanUp() {
  //       chart.destroy();
  //     };
  //   }, [layoutProps]);

  return (
    <>
      {/* begin::Tiles Widget 1 */}
      <div className={`card card-custom bg-radial-gradient-white ${className}`}>
        {/* begin::Header */}
        <div className="card-header border-0 pt-5">
          <h3 className="card-title font-weight-bolder text-dark">
            Sales Metrics
          </h3>
          {/* <div className="card-toolbar">
            <Dropdown className="dropdown-inline" alignRight>
              <Dropdown.Toggle
                className="btn btn-text-white btn-hover-white btn-sm btn-icon border-0"
                variant="transparent"
                id="dropdown-toggle-top"
                as={DropdownCustomToggler}
              >
                <i className="ki ki-bold-more-hor" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                <DropdownMenu2 />
              </Dropdown.Menu>
            </Dropdown>
          </div> */}
        </div>
        {/* end::Header */}

        {/* begin::Body */}
        <div className="card-body d-flex flex-column p-0">
          {/* begin::Chart */}
          {/* <div
            id="kt_custom_mixed_widget_1_chart"
            data-color={chartColor}
            style={{ height: '350px', minHeight: '200px' }}
          /> */}
          {/* end::Chart */}

          {/* begin::Stats */}
          <div className="card-spacer bg-white card-rounded flex-grow-1">
            <div className="d-flex justify-content-between m-0">
              <div className="col bg-light-primary px-6 py-8 rounded-xl mb-7 mr-2">
                <div className="d-flex flex-column align-items-center">
                  <div>
                    <span className="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
                      {/* <SVG
                  src={toAbsoluteUrl(
                    '/media/svg/icons/Communication/Add-user.svg'
                  )}
                ></SVG> */}
                      <FontAwesomeIcon
                        icon={faUsers}
                        style={{
                          color: '#3699FF',
                        }}
                      />
                    </span>
                    <Link
                      to="/admin/users"
                      className="text-primary font-weight-bold font-size-h6 mt-2"
                    >
                      Users
                    </Link>
                  </div>
                  <div>
                    <Typography
                      variant="h3"
                      gutterBottom
                      style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: '#3699FF',
                      }}
                    >
                      45
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="col bg-light-danger px-6 py-8 rounded-xl mb-7 mr-2">
                <div className="d-flex flex-column align-items-center">
                  <div>
                    <span className="svg-icon svg-icon-3x svg-icon-danger d-block my-2">
                      {/* <SVG
                  src={toAbsoluteUrl('/media/svg/icons/Design/Layers.svg')}
                ></SVG> */}
                      <FontAwesomeIcon
                        icon={faPeopleArrows}
                        style={{ color: '#F64E60' }}
                      />
                    </span>
                    <Link
                      to="/admin/agencies"
                      className="text-danger font-weight-bold font-size-h6 mt-2"
                    >
                      Agencies
                    </Link>
                  </div>
                  <div>
                    <Typography
                      variant="h3"
                      gutterBottom
                      style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: '#F64E60',
                      }}
                    >
                      33
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="col bg-light-warning px-6 py-8 rounded-xl mr-7 mb-7">
                <div className="d-flex flex-column align-items-center">
                  <div>
                    <span className="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
                      {/* <SVG
                  src={toAbsoluteUrl('/media/svg/icons/Media/Equalizer.svg')}
                ></SVG> */}
                      <Group style={{ color: '#FFA800' }} />
                    </span>
                    <Link
                      to="/admin/platform-admins"
                      className="text-warning font-weight-bold font-size-h6"
                    >
                      Admins
                    </Link>
                  </div>
                  <div>
                    <Typography
                      variant="h3"
                      gutterBottom
                      style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: '#FFA800',
                      }}
                    >
                      90
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
            {/* begin::Row */}
            {/* <div className="row m-0">
              <div className="col px-8 py-6 mr-8">
                <div className="font-size-sm text-muted font-weight-bold">
                  Average Sale
                </div>
                <div className="font-size-h4 font-weight-bolder">$650</div>
              </div>
              <div className="col px-8 py-6">
                <div className="font-size-sm text-muted font-weight-bold">
                  Commission
                </div>
                <div className="font-size-h4 font-weight-bolder">$233,600</div>
              </div>
            </div> */}
            {/* end::Row */}
            {/* begin::Row */}
            {/* <div className="row m-0">
              <div className="col px-8 py-6 mr-8">
                <div className="font-size-sm text-muted font-weight-bold">
                  Annual Taxes
                </div>
                <div className="font-size-h4 font-weight-bolder">$29,004</div>
              </div>
              <div className="col px-8 py-6">
                <div className="font-size-sm text-muted font-weight-bold">
                  Annual Income
                </div>
                <div className="font-size-h4 font-weight-bolder">$1,480,00</div>
              </div>
            </div> */}
            {/* end::Row */}
          </div>
          {/* end::Stats */}
        </div>
        {/* end::Body */}
      </div>
      {/* end::Tiles Widget 1 */}
    </>
  );
}
