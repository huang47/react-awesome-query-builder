import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import range from "lodash/range";

const PROXIMITY_TERMS = [
  { title: 'NEAR', value: 'NEAR' },
  { title: 'BEFORE', value: 'BEFORE' },
  { title: 'EXCEPT', value: 'EXCEPT' },
];
const DEFAULT_PROXIMITY_TERM = 'NEAR';

export default class Proximity extends PureComponent {
  static propTypes = {
    config: PropTypes.object.isRequired,
    setOption: PropTypes.func.isRequired,
    options: PropTypes.any.isRequired, //instanceOf(Immutable.Map)
    minProximity: PropTypes.number,
    maxProximity: PropTypes.number,
    optionPlaceholder: PropTypes.string,
    optionTextBefore: PropTypes.string,
    optionLabel: PropTypes.string,
    customProps: PropTypes.object,
    readonly: PropTypes.bool,
    //children
  };

  static defaultProps = {
    customProps: {},
    minProximity: 2,
    maxProximity: 10,
    optionPlaceholder: "Select words between",
    optionLabel: "Words between",
    optionTextBefore: null,
  };

  handleChange = (value) => {
    this.props.setOption("proximity", parseInt(value));
  }

  handleTermChange = (value) => {
    this.props.setOption("term", value);
  }

  render() {
    const {
      defaults, options, config, optionLabel, optionPlaceholder, customProps, 
      minProximity, maxProximity, optionTextBefore, readonly
    } = this.props;
    const {settings, widgets} = config;
    const defaultProximity = defaults ? defaults.proximity : undefined;
    const defaultProximityTerm = defaults && defaults.term ? defaults.term : DEFAULT_PROXIMITY_TERM;
    const {showLabels} = settings;
    const selectedProximity = options.get("proximity", defaultProximity);
    const selectedProximityTerm = options.get("term", defaultProximityTerm);
    const proxValues = range(minProximity, maxProximity + 1).map((item) => ({title: item, value: item}));
    const Select = widgets.select.factory;

    return (
      <div className="operator--PROXIMITY">
        <div className="operator--options">
          <Select
            config={config}
            value={selectedProximityTerm}
            listValues={PROXIMITY_TERMS}
            setValue={this.handleTermChange}
            readonly={readonly}
            placeholder={optionPlaceholder}
            {...customProps}
          />
          <Select
            config={config}
            value={selectedProximity}
            listValues={proxValues}
            setValue={this.handleChange}
            readonly={readonly}
            placeholder={optionPlaceholder}
            {...customProps}
          />
        </div>
        <div className="operator--widgets">{this.props.children}</div>
      </div>
    );
  }
}
