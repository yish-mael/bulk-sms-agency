/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SVG from 'react-inlinesvg';
import objectPath from 'object-path';
import ApexCharts from 'apexcharts';
import { Dropdown } from 'react-bootstrap';
import { toAbsoluteUrl } from '../../../_helpers';
import { useHtmlClassService } from '../../../layout';
import { DropdownMenu2 } from '../../dropdowns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleArrows } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { Group, LocalActivity } from '@material-ui/icons';
import { Typography } from '@material-ui/core';

export function MixedWidget1({ className }) {
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
      colorsGrayGray300: objectPath.get(
        uiService.config,
        'js.colors.gray.gray300'
      ),
      colorsThemeBaseDanger: objectPath.get(
        uiService.config,
        'js.colors.theme.base.danger'
      ),
      fontFamily: objectPath.get(uiService.config, 'js.fontFamily'),
    };
  }, [uiService]);

  useEffect(() => {
    const element = document.getElementById('kt_mixed_widget_1_chart');
    if (!element) {
      return;
    }

    const options = getChartOptions(layoutProps);

    const chart = new ApexCharts(element, options);
    chart.render();
    return function cleanUp() {
      chart.destroy();
    };
  }, [layoutProps]);

  return (
    <div className={`card card-custom bg-gray-100 ${className}`}>
      {/* Header */}
      <div className="card-header border-0 bg-danger py-5">
        <h3 className="card-title font-weight-bolder text-white">SMS Stat</h3>
      </div>
      {/* Body */}
      <div className="card-body p-0 position-relative overflow-hidden">
        {/* Chart */}
        <div
          id="kt_mixed_widget_1_chart"
          className="card-rounded-bottom bg-danger"
          style={{ height: '300px' }}
        ></div>

        {/* Stat */}
        <div className="card-spacer mt-n55">
          <div className="d-flex justify-content-between m-0">
            <div className="col bg-light-primary px-6 py-8 rounded-xl mb-7 mr-2">
              <div className="d-flex justify-content-between">
                <div>
                  <span className="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
                    {/* <SVG
                  src={toAbsoluteUrl(
                    '/media/svg/icons/Communication/Add-user.svg'
                  )}
                ></SVG> */}
                    <FontAwesomeIcon
                      icon={faUsers}
                      style={{ color: '#3699FF' }}
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
                    580
                  </Typography>
                </div>
              </div>
            </div>
            <div className="col bg-light-danger px-6 py-8 rounded-xl mb-7 mr-2">
              <div className="d-flex justify-content-between">
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
                    10
                  </Typography>
                </div>
              </div>
            </div>
            <div className="col bg-light-warning px-6 py-8 rounded-xl mr-7 mb-7">
              <div className="d-flex justify-content-between">
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
                    30
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row m-0">
          </div> */}
        </div>

        {/* Resize */}
        <div className="resize-triggers">
          <div className="expand-trigger">
            <div style={{ width: '411px', height: '461px' }} />
          </div>
          <div className="contract-trigger" />
        </div>
      </div>
    </div>
  );
}

function getChartOptions(layoutProps) {
  const strokeColor = '#D13647';

  const options = {
    series: [
      {
        name: 'Requested SMS',
        data: [30, 45, 32, 70, 40, 40],
      },
    ],
    chart: {
      type: 'area',
      height: 200,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
      dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 5,
        left: 0,
        blur: 3,
        color: strokeColor,
        opacity: 0.5,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'solid',
      opacity: 0,
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: [strokeColor],
    },
    xaxis: {
      categories: [
        'Agency A',
        'Agency B',
        'Agency C',
        'Agency D',
        'Agency E',
        'Agency F',
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        style: {
          colors: layoutProps.colorsGrayGray500,
          fontSize: '12px',
          fontFamily: layoutProps.fontFamily,
        },
      },
      crosshairs: {
        show: false,
        position: 'front',
        stroke: {
          color: layoutProps.colorsGrayGray300,
          width: 1,
          dashArray: 3,
        },
      },
    },
    yaxis: {
      min: 0,
      max: 80,
      labels: {
        show: false,
        style: {
          colors: layoutProps.colorsGrayGray500,
          fontSize: '12px',
          fontFamily: layoutProps.fontFamily,
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
        fontFamily: layoutProps.fontFamily,
      },
      y: {
        // formatter: function(val) {
        //   return '$' + val + ' thousands';
        // },
        formatter: (val) => `${val} SMS`,
      },
      marker: {
        show: false,
      },
    },
    colors: ['transparent'],
    markers: {
      colors: layoutProps.colorsThemeBaseDanger,
      strokeColor: [strokeColor],
      strokeWidth: 3,
    },
  };
  return options;
}
