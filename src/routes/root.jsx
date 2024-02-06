import { Page } from '@mobiscroll/react';
import { Link } from 'react-router-dom';

export default function Root() {
  return (
    <>
      <Page>
        <div className="mbsc-padding">
          <h1>Mobiscroll React Demos</h1>

          <h2>Event Calendar</h2>

          <h3>Agenda</h3>

          <ul>
            <li>
              <Link to="/agenda/daily-agenda-with-week-calendar">Compact daily schedule</Link>
            </li>
            <li>
              <Link to="/agenda/basic-usage">How to initialize</Link>
            </li>
            <li>
              <Link to="/agenda/daily-weekly-monthly-annual-agenda">Customize the range</Link>
            </li>
            <li>
              <Link to="/agenda/printing-the-view">Print mode</Link>
            </li>
            <li>
              <Link to="/agenda/synchronized-views">Synchronized views</Link>
            </li>
            <li>
              <Link to="/agenda/custom-event-sort">Custom event order</Link>
            </li>
            <li>
              <Link to="/agenda/setting-the-timezone">Timezones</Link>
            </li>
            <li>
              <Link to="/agenda/searching-events-in-popup">Event search with popup</Link>
            </li>
            <li>
              <Link to="/agenda/event-content-customization">Content customization</Link>
            </li>
            <li>
              <Link to="/agenda/full-event-customization">Full event customization</Link>
            </li>
            <li>
              <Link to="/agenda/customizing-header">Customizing the header</Link>
            </li>
            <li>
              <Link to="/agenda/custom-event-tooltip">Custom event tooltip</Link>
            </li>
            <li>
              <Link to="/agenda/resource-filtering-in-header">In-header filtering</Link>
            </li>
            <li>
              <Link to="/agenda/empty-state">Empty state</Link>
            </li>
            <li>
              <Link to="/agenda/event-data-structure">Event properties</Link>
            </li>
            <li>
              <Link to="/agenda/date-object-ISO-8601-moment">Supported date formats</Link>
            </li>
            <li>
              <Link to="/agenda/recurring-events">Recurrence rules</Link>
            </li>
            <li>
              <Link to="/agenda/load-inline-data">Loading inline data</Link>
            </li>
            <li>
              <Link to="/agenda/load-events-from-remote-api">Events from a remote API</Link>
            </li>
            <li>
              <Link to="/agenda/load-events-on-demand">Loading events on demand</Link>
            </li>
            <li>
              <Link to="/agenda/sync-events-google-calendar">Sync events to google calendar</Link>
            </li>
            <li>
              <Link to="/agenda/sync-events-outlook-calendar">Sync events to outlook calendar</Link>
            </li>
            <li>
              <Link to="/agenda/load-events-from-google-calendar">Load events from public google calendar</Link>
            </li>
            <li>
              <Link to="/agenda/event-bulk-actions-edit-delete-update">Multiple select & bulk operations</Link>
            </li>
            <li>
              <Link to="/agenda/themes-ios-material-windows">Theming capabilities</Link>
            </li>
            <li>
              <Link to="/agenda/event-hooks">Lifecycle events</Link>
            </li>
            <li>
              <Link to="/agenda/gregorian-jalali-hijri">Calendar systems </Link>
            </li>
            <li>
              <Link to="/agenda/localization">Localization</Link>
            </li>
          </ul>

          <h3>Event Calendar</h3>

          <ul>
            <li>
              <Link to="/eventcalendar/mobile-month-view">Mobile month view</Link>
            </li>
            <li>
              <Link to="/eventcalendar/desktop-month-view">Desktop month view</Link>
            </li>
            <li>
              <Link to="/eventcalendar/responsive-month-view">Responsive</Link>
            </li>
            <li>
              <Link to="/eventcalendar/printing-the-view">Print mode</Link>
            </li>
            <li>
              <Link to="/eventcalendar/event-labels">Events as labels</Link>
            </li>
            <li>
              <Link to="/eventcalendar/event-popover">Events in popover</Link>
            </li>
            <li>
              <Link to="/eventcalendar/custom-event-sort">Custom event order</Link>
            </li>
            <li>
              <Link to="/eventcalendar/setting-the-timezone">Timezones</Link>
            </li>
            <li>
              <Link to="/eventcalendar/multiple-timezone-support">Switching timezones</Link>
            </li>
            <li>
              <Link to="/eventcalendar/searching-events-in-popup">Event search with popup</Link>
            </li>
            <li>
              <Link to="/eventcalendar/searching-events-in-sidebar">Event search with sidebar</Link>
            </li>
            <li>
              <Link to="/eventcalendar/month-week-view">Month or week view</Link>
            </li>
            <li>
              <Link to="/eventcalendar/quarter-year-view">Multi-month or year view</Link>
            </li>
            <li>
              <Link to="/eventcalendar/show-more-all-labels">Displaying labels</Link>
            </li>
            <li>
              <Link to="/eventcalendar/colored-cell-background">Colored backgrounds</Link>
            </li>
            <li>
              <Link to="/eventcalendar/switching-day-week-month-view">Switching views</Link>
            </li>
            <li>
              <Link to="/eventcalendar/customize-label-look-and-feel">Custom event labels</Link>
            </li>
            <li>
              <Link to="/eventcalendar/customize-event-popover">Custom events in popover</Link>
            </li>
            <li>
              <Link to="/eventcalendar/customizing-header">Customizing the header</Link>
            </li>
            <li>
              <Link to="/eventcalendar/custom-event-tooltip">Custom event tooltip</Link>
            </li>
            <li>
              <Link to="/eventcalendar/move-resize-drag-drop-to-create-events">Move, resize & create</Link>
            </li>
            <li>
              <Link to="/eventcalendar/conditional-move-resize">Conditional move & resize per event or globally</Link>
            </li>
            <li>
              <Link to="/eventcalendar/drag-drop-between-calendar-instances">Drag & drop between calendars</Link>
            </li>
            <li>
              <Link to="/eventcalendar/blocked-days-ranges">Manage blocked out dates</Link>
            </li>
            <li>
              <Link to="/eventcalendar/prevent-double-booking-events">Prevent event overlap</Link>
            </li>
            <li>
              <Link to="/eventcalendar/external-drag-drop-schedule-unschedule">External drag and drop</Link>
            </li>
            <li>
              <Link to="/eventcalendar/external-event-presets">External d&d presets</Link>
            </li>
            <li>
              <Link to="/eventcalendar/resource-filtering-in-header">In-header filtering</Link>
            </li>
            <li>
              <Link to="/eventcalendar/event-data-structure">Event properties</Link>
            </li>
            <li>
              <Link to="/eventcalendar/date-object-ISO-8601-moment">Supported date formats</Link>
            </li>
            <li>
              <Link to="/eventcalendar/recurring-events">Recurrence rules</Link>
            </li>
            <li>
              <Link to="/eventcalendar/load-inline-data">Loading inline data</Link>
            </li>
            <li>
              <Link to="/eventcalendar/load-events-from-remote-api">Events from remote API </Link>
            </li>
            <li>
              <Link to="/eventcalendar/load-events-on-demand">Loading events on demand</Link>
            </li>
            <li>
              <Link to="/eventcalendar/sync-events-google-calendar">Sync events to google calendar</Link>
            </li>
            <li>
              <Link to="/eventcalendar/sync-events-outlook-calendar">Sync events to outlook calendar</Link>
            </li>
            <li>
              <Link to="/eventcalendar/load-events-from-google-calendar">Load events from public google calendar</Link>
            </li>
            <li>
              <Link to="/eventcalendar/create-read-update-delete-CRUD">Add/edit/delete events</Link>
            </li>
            <li>
              <Link to="/eventcalendar/recurring-event-add-edit-dialog">Recurring event editor</Link>
            </li>
            <li>
              <Link to="/eventcalendar/disallow-past-event-creation">Disable past event creation</Link>
            </li>
            <li>
              <Link to="/eventcalendar/event-bulk-actions-edit-delete-update">Multiple select & bulk operations</Link>
            </li>
            <li>
              <Link to="/eventcalendar/cut-copy-paste-events-between-calendars">Move events between calendars</Link>
            </li>
            <li>
              <Link to="/eventcalendar/themes-ios-material-windows">Theming capabilities</Link>
            </li>
            <li>
              <Link to="/eventcalendar/localization">Localization</Link>
            </li>
            <li>
              <Link to="/eventcalendar/gregorian-jalali-hijri">Calendar systems </Link>
            </li>
            <li>
              <Link to="/eventcalendar/event-hooks">Lifecycle events</Link>
            </li>
          </ul>

          <h3>Scheduler</h3>

          <ul>
            <li>
              <Link to="/scheduler/mobile-day-view">Mobile daily schedule</Link>
            </li>
            <li>
              <Link to="/scheduler/desktop-day-view">Desktop daily schedule</Link>
            </li>
            <li>
              <Link to="/scheduler/mobile-week-view">Mobile weekly schedule</Link>
            </li>
            <li>
              <Link to="/scheduler/desktop-week-view">Desktop weekly schedule</Link>
            </li>
            <li>
              <Link to="/scheduler/responsive-day-week-schedule">Responsive behavior</Link>
            </li>
            <li>
              <Link to="/scheduler/printing-the-view">Print mode</Link>
            </li>
            <li>
              <Link to="/scheduler/work-week-hours">Work calendar</Link>
            </li>
            <li>
              <Link to="/scheduler/doctors-appointment">Doctor&#39;s appointment</Link>
            </li>
            <li>
              <Link to="/scheduler/custom-range-view">Custom range view</Link>
            </li>
            <li>
              <Link to="/scheduler/control-number-of-concurrently-shown-events">Set event stack size</Link>
            </li>
            <li>
              <Link to="/scheduler/display-multiple-days-weeks">Customize view range</Link>
            </li>
            <li>
              <Link to="/scheduler/disable-all-day-events">Show/hide all-day events</Link>
            </li>
            <li>
              <Link to="/scheduler/colored-cell-background">Colored backgrounds</Link>
            </li>
            <li>
              <Link to="/scheduler/colors-invalids-css-class">CSS class for colors and invalids</Link>
            </li>
            <li>
              <Link to="/scheduler/switching-calendar-scheduler-agenda">Switching views</Link>
            </li>
            <li>
              <Link to="/scheduler/show-hide-hours-days">Visible hours and days</Link>
            </li>
            <li>
              <Link to="/scheduler/setting-the-timezone">Timezones</Link>
            </li>
            <li>
              <Link to="/scheduler/multiple-timezone-support">Switching timezones</Link>
            </li>
            <li>
              <Link to="/scheduler/show-multiple-timezones">Display time for multiple timezones</Link>
            </li>
            <li>
              <Link to="/scheduler/searching-events-in-sidebar">Event search with sidebar</Link>
            </li>
            <li>
              <Link to="/scheduler/custom-event-tooltip">Custom event tooltip</Link>
            </li>
            <li>
              <Link to="/scheduler/customizing-events">Event customization</Link>
            </li>
            <li>
              <Link to="/scheduler/date-header-template">Date header template</Link>
            </li>
            <li>
              <Link to="/scheduler/custom-resource-header-template">Resource template</Link>
            </li>
            <li>
              <Link to="/scheduler/customizing-header">Customizing the header</Link>
            </li>
            <li>
              <Link to="/scheduler/move-resize-drag-drop-to-create-events">Move, resize & create</Link>
            </li>
            <li>
              <Link to="/scheduler/conditional-move-resize">Conditional move & resize per event, resource or globally</Link>
            </li>
            <li>
              <Link to="/scheduler/drag-drop-between-calendar-instances">Drag & drop between schedulers</Link>
            </li>
            <li>
              <Link to="/scheduler/time-off-blocked-ranges">Blocked out times</Link>
            </li>
            <li>
              <Link to="/scheduler/prevent-double-booking-events">Prevent event overlap</Link>
            </li>
            <li>
              <Link to="/scheduler/external-drag-drop-schedule-unschedule">External drag and drop</Link>
            </li>
            <li>
              <Link to="/scheduler/external-event-presets">External d&d presets</Link>
            </li>
            <li>
              <Link to="/scheduler/resource-view">Multiple resources</Link>
            </li>
            <li>
              <Link to="/scheduler/group-by-resource-by-day">Resource grouping</Link>
            </li>
            <li>
              <Link to="/scheduler/shared-events-across-resources">Shared events</Link>
            </li>
            <li>
              <Link to="/scheduler/dynamic-add-remove-resources-filter">Show/hide resources</Link>
            </li>
            <li>
              <Link to="/scheduler/resource-data-structure">Resource properties</Link>
            </li>
            <li>
              <Link to="/scheduler/event-data-structure">Event properties</Link>
            </li>
            <li>
              <Link to="/scheduler/date-object-ISO-8601-moment">Supported date formats</Link>
            </li>
            <li>
              <Link to="/scheduler/recurring-events">Recurrence rules</Link>
            </li>
            <li>
              <Link to="/scheduler/load-inline-data">Loading inline data</Link>
            </li>
            <li>
              <Link to="/scheduler/load-events-from-remote-api">Events from remote API </Link>
            </li>
            <li>
              <Link to="/scheduler/load-events-on-demand">Loading events on demand</Link>
            </li>
            <li>
              <Link to="/scheduler/sync-events-google-calendar">Sync events to google calendar</Link>
            </li>
            <li>
              <Link to="/scheduler/sync-events-outlook-calendar">Sync events to outlook calendar</Link>
            </li>
            <li>
              <Link to="/scheduler/load-events-from-google-calendar">Load events from public google calendar</Link>
            </li>
            <li>
              <Link to="/scheduler/create-read-update-delete-CRUD">Add/edit/delete events</Link>
            </li>
            <li>
              <Link to="/scheduler/event-bulk-actions-edit-delete-update">Multiple select & bulk operations</Link>
            </li>
            <li>
              <Link to="/scheduler/recurring-event-add-edit-dialog">Recurring event editor</Link>
            </li>
            <li>
              <Link to="/scheduler/disallow-past-event-creation">Disable past event creation</Link>
            </li>
            <li>
              <Link to="/scheduler/resource-filtering-in-header">Custom component in header</Link>
            </li>
            <li>
              <Link to="/scheduler/themes-ios-material-windows">Theming capabilities</Link>
            </li>
            <li>
              <Link to="/scheduler/gregorian-jalali-hijri">Calendar systems </Link>
            </li>
            <li>
              <Link to="/scheduler/event-hooks">Lifecycle events</Link>
            </li>
            <li>
              <Link to="/scheduler/localization">Localization</Link>
            </li>
          </ul>

          <h3>Timeline</h3>

          <ul>
            <li>
              <Link to="/timeline/month-view">Monthly timeline</Link>
            </li>
            <li>
              <Link to="/timeline/timeline-time-grid">Timeline vs time grid</Link>
            </li>
            <li>
              <Link to="/timeline/printing-the-view">Print mode</Link>
            </li>
            <li>
              <Link to="/timeline/employee-shifts">Employee shift planning</Link>
            </li>
            <li>
              <Link to="/timeline/work-order-scheduling">Work order scheduling</Link>
            </li>
            <li>
              <Link to="/timeline/timezone-meeting-planner">Meeting planner across timezones</Link>
            </li>
            <li>
              <Link to="/timeline/restaurant-shift-management">Restaurant shift management</Link>
            </li>
            <li>
              <Link to="/timeline/meal-planner">Weekly meal planner</Link>
            </li>
            <li>
              <Link to="/timeline/dynamically-color-and-invalidate">Dynamically color & invalidate</Link>
            </li>
            <li>
              <Link to="/timeline/multi-classroom-timetable">Multiple classroom scheduling</Link>
            </li>
            <li>
              <Link to="/timeline/monthly-timetable-vertical-days-horizontal-times">Single resource timetable</Link>
            </li>
            <li>
              <Link to="/timeline/compare-resources-fixed-at-top">Compare resources</Link>
            </li>
            <li>
              <Link to="/timeline/assign-unassign-work-orders-fixed-top-row">Assign/unassign work orders</Link>
            </li>
            <li>
              <Link to="/timeline/flight-scheduling-two-synchronized-timelines">Flight scheduling with two timelines</Link>
            </li>
            <li>
              <Link to="/timeline/daily-weekly-monthly-yearly-timeline">Configure the timeline</Link>
            </li>
            <li>
              <Link to="/timeline/multiple-days-weeks-months-quarters-years-variable-resolution">Configure the page, size, resolution</Link>
            </li>
            <li>
              <Link to="/timeline/control-number-of-concurrently-shown-events">Set event stack size</Link>
            </li>
            <li>
              <Link to="/timeline/custom-range-view">View with custom range picker</Link>
            </li>
            <li>
              <Link to="/timeline/colors-invalids-css-class">CSS class for colors and invalids</Link>
            </li>
            <li>
              <Link to="/timeline/timeline-resource-height">Equal row height</Link>
            </li>
            <li>
              <Link to="/timeline/event-listing">Daily event summary</Link>
            </li>
            <li>
              <Link to="/timeline/switching-day-week-work-week-timeline">Day, week, work week</Link>
            </li>
            <li>
              <Link to="/timeline/setting-the-timezone">Timezones</Link>
            </li>
            <li>
              <Link to="/timeline/multiple-timezone-support">Switching timezones</Link>
            </li>
            <li>
              <Link to="/timeline/searching-events-in-sidebar">Event search with sidebar</Link>
            </li>
            <li>
              <Link to="/timeline/timeline-custom-event-rendering">Timeline event template</Link>
            </li>
            <li>
              <Link to="/timeline/hour-day-week-month-quarter-year-header-footer-template">
                Hour, day, week, month, year header and footer template
              </Link>
            </li>
            <li>
              <Link to="/timeline/shift-template">Time slot template</Link>
            </li>
            <li>
              <Link to="/timeline/resource-header-template">Resource header template</Link>
            </li>
            <li>
              <Link to="/timeline/custom-event-tooltip">Custom event tooltip</Link>
            </li>
            <li>
              <Link to="/timeline/setting-row-height">Controlling the row height</Link>
            </li>
            <li>
              <Link to="/timeline/move-resize-drag-drop-to-create-events">Move, resize & create</Link>
            </li>
            <li>
              <Link to="/timeline/conditional-move-resize">Conditional move & resize per event, resource or globally</Link>
            </li>
            <li>
              <Link to="/timeline/drag-drop-between-calendar-instances">Drag & drop between timelines</Link>
            </li>
            <li>
              <Link to="/timeline/prevent-double-booking-events">Prevent event overlap</Link>
            </li>
            <li>
              <Link to="/timeline/timeline-resource-details-side-panel-footer">Resource grid</Link>
            </li>
            <li>
              <Link to="/timeline/resource-grouping-hierarchy">Resource grouping & hierarchy</Link>
            </li>
            <li>
              <Link to="/timeline/resource-data-structure">Resource properties</Link>
            </li>
            <li>
              <Link to="/timeline/event-data-structure">Event properties</Link>
            </li>
            <li>
              <Link to="/timeline/connecting-linking-events-arrows">Event connections</Link>
            </li>
            <li>
              <Link to="/timeline/date-object-ISO-8601-moment">Supported date formats</Link>
            </li>
            <li>
              <Link to="/timeline/recurring-events">Recurrence rules</Link>
            </li>
            <li>
              <Link to="/timeline/load-inline-data">Loading inline data</Link>
            </li>
            <li>
              <Link to="/timeline/load-events-from-remote-api">Events from remote API </Link>
            </li>
            <li>
              <Link to="/timeline/load-events-on-demand">Loading events on demand</Link>
            </li>
            <li>
              <Link to="/timeline/load-resources-on-demand">Loading resources on demand</Link>
            </li>
            <li>
              <Link to="/timeline/loading-big-data-sets">Working with large data sets</Link>
            </li>
            <li>
              <Link to="/timeline/sync-events-google-calendar">Sync events to google calendar</Link>
            </li>
            <li>
              <Link to="/timeline/sync-events-outlook-calendar">Sync events to outlook calendar</Link>
            </li>
            <li>
              <Link to="/timeline/load-events-from-google-calendar">Load events from public google calendar</Link>
            </li>
            <li>
              <Link to="/timeline/create-read-update-delete-CRUD">Add/edit/delete events</Link>
            </li>
            <li>
              <Link to="/timeline/disallow-past-event-creation">Disable past event creation</Link>
            </li>
            <li>
              <Link to="/timeline/event-bulk-actions-edit-delete-update">Multiple select & bulk operations</Link>
            </li>
            <li>
              <Link to="/timeline/themes-ios-material-windows">Theming capabilities</Link>
            </li>
            <li>
              <Link to="/timeline/gregorian-jalali-hijri">Calendar systems </Link>
            </li>
            <li>
              <Link to="/timeline/event-hooks">Lifecycle events</Link>
            </li>
            <li>
              <Link to="/timeline/localization">Localization</Link>
            </li>
            <li>
              <Link to="/timeline/rtl-right-to-left">RTL mode</Link>
            </li>
          </ul>

          <h2>Date & time pickers</h2>

          <h3>Calendar</h3>

          <ul>
            <li>
              <Link to="/calendar/mobile-desktop-usage">Mobile & Desktop usage</Link>
            </li>
            <li>
              <Link to="/calendar/usage-on-input-or-inline">Initializing the picker</Link>
            </li>
            <li>
              <Link to="/calendar/responsive">Responsive behavior</Link>
            </li>
            <li>
              <Link to="/calendar/mobile-desktop-display">Understanding display modes</Link>
            </li>
            <li>
              <Link to="/calendar/appointment-booking">Appointment booking</Link>
            </li>
            <li>
              <Link to="/calendar/activity-calendar">Activity calendar</Link>
            </li>
            <li>
              <Link to="/calendar/date-picker">Date selection</Link>
            </li>
            <li>
              <Link to="/calendar/date-time-picker">Date & Time picker</Link>
            </li>
            <li>
              <Link to="/calendar/week-view">Variable week view</Link>
            </li>
            <li>
              <Link to="/calendar/multiple-months">Multi month view</Link>
            </li>
            <li>
              <Link to="/calendar/quarter-year-view">Quarter or year view</Link>
            </li>
            <li>
              <Link to="/calendar/week-to-month">Switching views</Link>
            </li>
            <li>
              <Link to="/calendar/dots-colors-labels">Marked, colored & labels</Link>
            </li>
            <li>
              <Link to="/calendar/month-change-direction-week-numbers-outer-days">Customizing the view</Link>
            </li>
            <li>
              <Link to="/calendar/single-select">Single value selection</Link>
            </li>
            <li>
              <Link to="/calendar/multiple-select">Multiple date selection</Link>
            </li>
            <li>
              <Link to="/calendar/week-select">Week selection</Link>
            </li>
            <li>
              <Link to="/calendar/range-select">Start-end selection</Link>
            </li>
            <li>
              <Link to="/calendar/date-object-ISO-8601-moment">Date types</Link>
            </li>
            <li>
              <Link to="/calendar/formatting-return-values">Formatting values</Link>
            </li>
            <li>
              <Link to="/calendar/setting-values-defaults">Setting values</Link>
            </li>
            <li>
              <Link to="/calendar/setting-the-picker-timezone">Timezones</Link>
            </li>
            <li>
              <Link to="/calendar/min-max-restrictions">Min & max values</Link>
            </li>
            <li>
              <Link to="/calendar/disabled-invalid-values">Disabled values</Link>
            </li>
            <li>
              <Link to="/calendar/recurring-values">Recurring values</Link>
            </li>
            <li>
              <Link to="/calendar/themes-ios-material-windows">Theming capabilities</Link>
            </li>
            <li>
              <Link to="/calendar/customizing-header">Customizing the header</Link>
            </li>
            <li>
              <Link to="/calendar/customize-marked-day-shapes">Marked day classes</Link>
            </li>
            <li>
              <Link to="/calendar/half-day-styling">Half days</Link>
            </li>
            <li>
              <Link to="/calendar/event-hooks">Lifecycle events</Link>
            </li>
            <li>
              <Link to="/calendar/gregorian-jalali-hijri">Calendar systems </Link>
            </li>
            <li>
              <Link to="/calendar/localization">Localization</Link>
            </li>
            <li>
              <Link to="/calendar/rtl-right-to-left">RTL mode</Link>
            </li>
          </ul>

          <h3>Date & Time</h3>

          <ul>
            <li>
              <Link to="/datetime/mobile-desktop-usage">Mobile & Desktop usage</Link>
            </li>
            <li>
              <Link to="/datetime/usage-on-input-or-inline">Initializing the picker</Link>
            </li>
            <li>
              <Link to="/datetime/responsive">Responsive behavior</Link>
            </li>
            <li>
              <Link to="/datetime/mobile-desktop-display">Understanding display modes</Link>
            </li>
            <li>
              <Link to="/datetime/date-picker">Date selection</Link>
            </li>
            <li>
              <Link to="/datetime/time-picker">Time selection</Link>
            </li>
            <li>
              <Link to="/datetime/date-time-picker">Date & time selection</Link>
            </li>
            <li>
              <Link to="/datetime/time-value-steps">Setting time select steps</Link>
            </li>
            <li>
              <Link to="/datetime/single-select">Single value selection</Link>
            </li>
            <li>
              <Link to="/datetime/range-select">Start-end selection</Link>
            </li>
            <li>
              <Link to="/datetime/date-object-ISO-8601-moment">Date types</Link>
            </li>
            <li>
              <Link to="/datetime/formatting-return-values">Formatting values</Link>
            </li>
            <li>
              <Link to="/datetime/month-year-picker">Credit card expiration</Link>
            </li>
            <li>
              <Link to="/datetime/setting-values-defaults">Setting values</Link>
            </li>
            <li>
              <Link to="/datetime/setting-the-picker-timezone">Timezones</Link>
            </li>
            <li>
              <Link to="/datetime/min-max-restrictions">Min & max values</Link>
            </li>
            <li>
              <Link to="/datetime/disabled-invalid-values">Disabled values</Link>
            </li>
            <li>
              <Link to="/datetime/recurring-values">Recurring values</Link>
            </li>
            <li>
              <Link to="/datetime/themes-ios-material-windows">Theming capabilities</Link>
            </li>
            <li>
              <Link to="/datetime/event-hooks">Lifecycle events</Link>
            </li>
            <li>
              <Link to="/datetime/gregorian-jalali-hijri">Calendar systems </Link>
            </li>
            <li>
              <Link to="/datetime/localization">Localization</Link>
            </li>
            <li>
              <Link to="/datetime/rtl-right-to-left">RTL mode</Link>
            </li>
          </ul>

          <h3>Range</h3>

          <ul>
            <li>
              <Link to="/range/mobile-desktop-usage">Mobile & Desktop usage</Link>
            </li>
            <li>
              <Link to="/range/usage-on-input-or-inline">Initializing the picker</Link>
            </li>
            <li>
              <Link to="/range/responsive">Responsive behavior</Link>
            </li>
            <li>
              <Link to="/range/calendar-scroller-dropdown">Understanding the controls</Link>
            </li>
            <li>
              <Link to="/range/mobile-desktop-display">Understanding display modes</Link>
            </li>
            <li>
              <Link to="/range/date-filtering-with-predefined-ranges">Date filtering with presets</Link>
            </li>
            <li>
              <Link to="/range/flight-booking">Flight booking</Link>
            </li>
            <li>
              <Link to="/range/book-rental-months-ahead">Vacation property availability</Link>
            </li>
            <li>
              <Link to="/range/adding-event-start-end">New event creation</Link>
            </li>
            <li>
              <Link to="/range/date-range">Date range</Link>
            </li>
            <li>
              <Link to="/range/time-range">Time range</Link>
            </li>
            <li>
              <Link to="/range/date-time-range">Date & time range</Link>
            </li>
            <li>
              <Link to="/range/week-month-view-scrolling-direction">Customizing the calendar</Link>
            </li>
            <li>
              <Link to="/range/customizing-labels-selection">Customizing the range</Link>
            </li>
            <li>
              <Link to="/range/dots-colors-labels">Marked, colored & labels</Link>
            </li>
            <li>
              <Link to="/range/presets">Presets</Link>
            </li>
            <li>
              <Link to="/range/date-object-ISO-8601-moment">Date types</Link>
            </li>
            <li>
              <Link to="/range/formatting-return-values">Formatting values</Link>
            </li>
            <li>
              <Link to="/range/setting-the-picker-timezone">Timezones</Link>
            </li>
            <li>
              <Link to="/range/min-max-length">Setting the allowed range length</Link>
            </li>
            <li>
              <Link to="/range/min-max-restrictions">Min & max values</Link>
            </li>
            <li>
              <Link to="/range/disabled-invalid-values">Disabled values</Link>
            </li>
            <li>
              <Link to="/range/recurring-values">Recurring values</Link>
            </li>
            <li>
              <Link to="/range/themes-ios-material-windows">Theming capabilities</Link>
            </li>
            <li>
              <Link to="/range/customize-marked-day-shapes">Marked day classes</Link>
            </li>
            <li>
              <Link to="/range/half-day-styling">Half days</Link>
            </li>
            <li>
              <Link to="/range/event-hooks">Lifecycle events</Link>
            </li>
            <li>
              <Link to="/range/gregorian-jalali-hijri">Calendar systems </Link>
            </li>
            <li>
              <Link to="/range/localization">Localization</Link>
            </li>
            <li>
              <Link to="/range/rtl-right-to-left">RTL mode</Link>
            </li>
          </ul>

          <h2>Pickers & Dropdowns</h2>

          <h3>Select</h3>

          <ul>
            <li>
              <Link to="/select/mobile-desktop-usage">Mobile & Desktop usage</Link>
            </li>
            <li>
              <Link to="/select/responsive">Responsive behavior</Link>
            </li>
            <li>
              <Link to="/select/mobile-desktop-display">Understanding display modes</Link>
            </li>
            <li>
              <Link to="/select/data-sources">Populating the picker</Link>
            </li>
            <li>
              <Link to="/select/item-templating">Templating</Link>
            </li>
            <li>
              <Link to="/select/country-picker">Country Dropdown</Link>
            </li>
            <li>
              <Link to="/select/image-text">Image & text</Link>
            </li>
            <li>
              <Link to="/select/multiple-lines">Multiline select</Link>
            </li>
            <li>
              <Link to="/select/single-select">Single select</Link>
            </li>
            <li>
              <Link to="/select/multiple-select">Multiple select</Link>
            </li>
            <li>
              <Link to="/select/group-options">Group options</Link>
            </li>
            <li>
              <Link to="/select/filtering-values">Filtering</Link>
            </li>
            <li>
              <Link to="/select/linked-hierarchical-pickers">Multi level hierarchy</Link>
            </li>
            <li>
              <Link to="/select/setting-values-defaults">Setting values</Link>
            </li>
            <li>
              <Link to="/select/disabled-invalid-values">Disabled values</Link>
            </li>
            <li>
              <Link to="/select/themes-ios-material-windows">Theming capabilities</Link>
            </li>
            <li>
              <Link to="/select/event-hooks">Event hooks</Link>
            </li>
            <li>
              <Link to="/select/localization">Localization </Link>
            </li>
            <li>
              <Link to="/select/rtl-right-to-left">RTL support</Link>
            </li>
          </ul>

          <h2>Form components</h2>

          <h3>Forms</h3>

          <ul>
            <li>
              <Link to="/forms/mobile">Mobile form</Link>
            </li>
            <li>
              <Link to="/forms/desktop">Inline desktop form</Link>
            </li>
            <li>
              <Link to="/forms/responsive">Responsive form</Link>
            </li>
            <li>
              <Link to="/forms/popup">Inside a modal</Link>
            </li>
            <li>
              <Link to="/forms/alert-confirm-prompt">Alert, confirm & prompt</Link>
            </li>
            <li>
              <Link to="/forms/notifications">Toast & snackbar</Link>
            </li>
            <li>
              <Link to="/forms/buttons">Buttons</Link>
            </li>
            <li>
              <Link to="/forms/segmented">Segmented</Link>
            </li>
            <li>
              <Link to="/forms/stepper">Stepper</Link>
            </li>
            <li>
              <Link to="/forms/button-segmented-stepper-colors">Colors</Link>
            </li>
            <li>
              <Link to="/forms/inputs-text-areas-date-fields">Field types</Link>
            </li>
            <li>
              <Link to="/forms/input-label-types">Customize the input</Link>
            </li>
            <li>
              <Link to="/forms/checkbox">Checkbox</Link>
            </li>
            <li>
              <Link to="/forms/switch">Switch</Link>
            </li>
            <li>
              <Link to="/forms/radio-button">Radio buttons</Link>
            </li>
            <li>
              <Link to="/forms/themes-ios-material-windows">Theming capabilities</Link>
            </li>
          </ul>
        </div>
      </Page>
    </>
  );
}
