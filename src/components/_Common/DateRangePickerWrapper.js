import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import omit from 'lodash/omit';

import isInclusivelyAfterDay from '../../utils/is-inclusively-after-day';

const defaultProps = {
  // example props for the demo
  autoFocus: false,
  autoFocusEndDate: false,
  initialStartDate: null,
  initialEndDate: null,

  // input related props
  startDateId: 'startDate',
  startDatePlaceholderText: 'Start Date',
  endDateId: 'endDate',
  endDatePlaceholderText: 'End Date',
  disabled: false,
  required: false,
  screenReaderInputMessage: '',
  showClearDates: false,
  showDefaultInputIcon: false,
  customInputIcon: null,
  customArrowIcon: null,
  customCloseIcon: null,

  // calendar presentation and interaction related props
  renderMonth: null,
  orientation: 'horizontal',
  anchorDirection: 'left',
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 2,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDates: false,
  isRTL: false,

  // navigation related props
  navPrev: null,
  navNext: null,
  onPrevMonthClick() {},
  onNextMonthClick() {},

  // day presentation and interaction related props
  renderDay: null,
  minimumNights: 1,
  enableOutsideDays: false,
  isDayBlocked: () => false,
  isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
  isDayHighlighted: () => false,

  // internationalization
  displayFormat: () => moment.localeData().longDateFormat('L'),
  monthFormat: 'MMMM YYYY'
};

class DateRangePickerWrapper extends React.Component {
  constructor(props) {
    super(props);

    let focusedInput = null;
    if (props.autoFocus) {
      focusedInput = 'startDate';
    } else if (props.autoFocusEndDate) {
      focusedInput = 'endDate';
    }

    this.state = {
      focusedInput,
      startDate: props.initialStartDate,
      endDate: props.initialEndDate
    };
  }

  handleDatesChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate });
  }

  handleFocusChange = focusedInput => {
    this.setState({ focusedInput });
  }

  render() {
    const { focusedInput, startDate, endDate } = this.state;

    // autoFocus, autoFocusEndDate, initialStartDate and initialEndDate are helper props for the
    // example wrapper but are not props on the SingleDatePicker itself and
    // thus, have to be omitted.
    const props = omit(this.props, [
      'autoFocus',
      'autoFocusEndDate',
      'initialStartDate',
      'initialEndDate'
    ]);

    return (
      <div style={{ zIndex: '9999' }}>
        <DateRangePicker
          {...props}
          onDatesChange={this.handleDatesChange}
          onFocusChange={this.handleFocusChange}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    );
  }
}

DateRangePickerWrapper.propTypes = {
  autoFocus: PropTypes.bool,
  autoFocusEndDate: PropTypes.bool,
  initialStartDate: PropTypes.string,
  initialEndDate: PropTypes.string,
  onDatesChange: PropTypes.func.isRequired,
  onFocusChange: PropTypes.func.isRequired,

  // input related props
  startDateId: PropTypes.string,
  startDatePlaceholderText: PropTypes.string,
  endDateId: PropTypes.string,
  endDatePlaceholderText: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  screenReaderInputMessage: PropTypes.string,
  showClearDates: PropTypes.bool,
  showDefaultInputIcon: PropTypes.bool,
  customInputIcon: PropTypes.node,
  customArrowIcon: PropTypes.node,
  customCloseIcon: PropTypes.node,

  // calendar presentation and interaction related props
  renderMonth: PropTypes.func,
  orientation: PropTypes.object,
  anchorDirection: PropTypes.object,
  horizontalMargin: PropTypes.number,
  withPortal: PropTypes.bool,
  withFullScreenPortal: PropTypes.bool,
  isRTL: PropTypes.bool,
  initialVisibleMonth: PropTypes.func,
  numberOfMonths: PropTypes.number,
  keepOpenOnDateSelect: PropTypes.bool,
  reopenPickerOnClearDates: PropTypes.bool,

  // navigation related props
  navPrev: PropTypes.node,
  navNext: PropTypes.node,
  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,

  // day presentation and interaction related props
  renderDay: PropTypes.func,
  minimumNights: PropTypes.number,
  enableOutsideDays: PropTypes.bool,
  isDayBlocked: PropTypes.func,
  isOutsideRange: PropTypes.func,
  isDayHighlighted: PropTypes.func,

  // internationalization props
  displayFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  monthFormat: PropTypes.string
};
DateRangePickerWrapper.defaultProps = defaultProps;

export default DateRangePickerWrapper;
