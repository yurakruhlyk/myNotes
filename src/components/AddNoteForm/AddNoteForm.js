import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import ColorPicker from '../ColorPicker/ColorPicker';
import SelectLabels from '../SelectLabels/SelectLabels';

const styles = {
  containerForm: {
    width: '600px',
    margin: '0 auto',
    padding: '30px 0 15px'
  },
  cardActions: {
    backgroundColor: '#e0e0e0',
    justifyContent: 'space-between',
    padding: '10 16px'
  }
};

const DEFAULT_COLOR = '#FFF';
const defaultState = {
  title: '',
  text: '',
  color: DEFAULT_COLOR,
  labels: []
};

class AddNoteForm extends Component {
  constructor(props) {
    super(props);

    this.state = defaultState;
  }

  handleInputOnChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleColorChange = color => {
    this.setState({ color });
  };

  handleLabelCheck = labelChecked => {
    const { labels } = this.state;

    if (labels.includes(labelChecked)) {
      this.setState({
        labels: labels.filter(label => label !== labelChecked)
      });
    } else {
      this.setState({ labels: [labelChecked, ...this.state.labels] });
    }
  };

  handleSubmit = () => {
    const { title, text, color, labels } = this.state;

    this.props.addNote({
      title,
      text,
      color,
      labels
    });

    this.setState(defaultState);
  };

  render() {
    const { classes, labels } = this.props;
    const { title, text, color } = this.state;

    return (
      <div className={classes.containerForm}>
        <Card>
          <CardContent>
            <TextField
              value={title}
              label="Title"
              fullWidth
              onChange={this.handleInputOnChange('title')}
            />
            <TextField
              value={text}
              label="Text"
              fullWidth
              margin="normal"
              multiline
              rows="2"
              rowsMax="4"
              onChange={this.handleInputOnChange('text')}
            />
          </CardContent>
          <CardActions className={classes.cardActions}>
            <ColorPicker value={color} onChange={this.handleColorChange} />
            <SelectLabels
              labels={labels}
              values={this.state.labels}
              onLabelCheck={this.handleLabelCheck}
            />
            <Button
              variant="raised"
              color="primary"
              onClick={this.handleSubmit}
              disabled={!text}>
              Add
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

AddNoteForm.propTypes = {
  classes: PropTypes.object.isRequired,
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ).isRequired,
  addNote: PropTypes.func.isRequired
};

export default withStyles(styles)(AddNoteForm);
