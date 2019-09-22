import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const stepperStyle = makeStyles(theme => ({
    root: {
        width: '100%',
        textAlign: 'center'
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
}));

class TemperamentStepper extends Component {
    constructor(props) {
        super(props)

        // unroll data object into state
        this.state = {
            section: this.props.section
        };
    };

    handleGoToSection = async section => {
        switch (section) {
            case 'Section 1':
                var newSection = 1
                this.props.sendSection(newSection);
                break;
            case 'Section 2':
                newSection = 2
                this.props.sendSection(newSection);
                break;
            case 'Section 3':
                newSection = 3
                this.props.sendSection(newSection);
                break;
            case 'Section 4':
                newSection = 4
                this.props.sendSection(newSection);
                break;
            case 'Section 5':
                newSection = 5
                this.props.sendSection(newSection);
                break;
            case 'Section 6':
                newSection = 6
                this.props.sendSection(newSection);
                break;
            case 'Section 7':
                newSection = 7
                this.props.sendSection(newSection);
                break;
            default:
                console.log('Error: cannot navigate');
        };
    };

    getSteps = () => {
        return [
            'Section 1',
            'Section 2',
            'Section 3',
            'Section 4',
            'Section 5',
            'Section 6',
            'Section 7'
        ];
    };

    Steps = () => {
        const classes = stepperStyle();
        const sections = this.getSteps();
        const { section } = this.state;

        return (
            <React.Fragment>
                <div className={classes.root}>
                    <Stepper
                        activeStep={section - 1}
                        alternativeLabel
                    >
                        {sections.map(label => (
                            <Step
                                key={label}
                                onClick={() => this.handleGoToSection(label)}
                            >
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </div>
            </React.Fragment>
        );
    };

    render() {
        return (
            <this.Steps />
        );
    };
};

export default TemperamentStepper;