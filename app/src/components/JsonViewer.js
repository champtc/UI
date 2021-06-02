import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Panel from './ui/panel/Panel';
import Button from './ui/button/Button';

import detailsStyle from './json-viewer.scss';
import { removeEmptyValues } from '../utils/helpers';

@observer
export default class JsonViewer extends React.Component {
  constructor(props) {
    super(props);

    this.onClickCopyJSONHandler = this.onClickCopyJSONHandler.bind(this);
  }

  onClickCopyJSONHandler() {
    let me = this;
    let range = document.createRange();
    let message = 'JSON Copied to Clipboard';

    range.selectNode(document.getElementById('json-content'));

    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');

    window.getSelection().removeAllRanges();

    this.props.onClickShowGrowlHandler(message);
  }

  render() {
    console.log(
      'Bundle: ',
      JSON.stringify(removeEmptyValues(this.props.json), null, 2)
    );
    return (
      <Panel
        show={this.props.show}
        onClickHideHandler={this.props.onClickHideHandler}
      >
        <div className="json-viewer">
          <div className="json-content">
            <pre id="json-content">
              {this.props.json &&
                JSON.stringify(removeEmptyValues(this.props.json), null, 2)}
            </pre>
          </div>

          <div className="json-controls">
            <Button
              cls="def standard json-copy"
              text="Copy"
              onClick={this.onClickCopyJSONHandler}
            >
              <i className="material-icons">file_copy</i>
            </Button>
          </div>
        </div>
      </Panel>
    );
  }
}
