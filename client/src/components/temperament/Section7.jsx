import React, { Component } from 'react';
import api from '../../api';
import { TemperamentStepper } from '../../components'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ValidationMsg from '../../resources/Validation';
import {
    validateSectSeven,
    determineHasErrors,
    resetValErrSectSev
} from '../../resources/Validation';

import {
    Wrapper,
    Label,
    Button,
    Radios,
    ErrorBorder
} from '../../style/dog-styles';

class SectionSeven extends Component {
    constructor(props) {
        super(props)

        const sectionSevenData = this.props.sectionSevenData;

        // unroll data object into state
        this.state = {
            id: sectionSevenData.id,
            section: sectionSevenData.section,
            name: sectionSevenData.name,
            hairOrFur: sectionSevenData.hairOrFur,
            housebroken: sectionSevenData.housebroken,
            outsideOrInside: sectionSevenData.outsideOrInside,
            isFixed: sectionSevenData.isFixed,
            errors: {
                hairOrFur: false,
                housebroken: false,
                outsideOrInside: false,
                isFixed: false
            }
        };
    };

    handleHairOrFurChange = async e => {
        const hairOrFur = e.target.value;
        var errors = this.state.errors;

        // reset validation error if field now has value
        errors.hairOrFur = await resetValErrSectSev(hairOrFur);
        this.setState({ hairOrFur, errors });
    };

    handleHousebrokenChange = async e => {
        const housebroken = e.target.value;
        var errors = this.state.errors;

        errors.housebroken = await resetValErrSectSev(housebroken);
        this.setState({ housebroken, errors });
    };

    handleOutsideOrInsideChange = async e => {
        const outsideOrInside = e.target.value;
        var errors = this.state.errors;

        errors.outsideOrInside = await resetValErrSectSev(outsideOrInside);
        this.setState({ outsideOrInside, errors });
    };

    handleIsFixedChange = async e => {
        const isFixed = e.target.value;
        var errors = this.state.errors;

        errors.isFixed = await resetValErrSectSev(isFixed);
        this.setState({ isFixed, errors });
    };

    sendSection = async newSection => {
        this.props.sendNewSection(newSection);
    };

    handleValidation = async direction => {
        // get array of values from state
        const values = await this.getValuesArray();

        // get errors 
        const errors = await validateSectSeven(values);

        // determine if has errors
        const hasErrors = await determineHasErrors(errors);

        if (hasErrors) {
            const nextErrorState = {
                hairOrFur: errors[0],
                housebroken: errors[1],
                outsideOrInside: errors[2],
                isFixed: errors[3]
            };

            // show error alert at top of parent
            this.props.showErrorAlert()
            this.setState({ errors: nextErrorState });
        } else {
            if (direction === 'next') {
                this.handleNextBiography();
            } else if (direction === 'back') {
                this.handleBackSection();
            };
        };
    };

    getValuesArray = async () => {
        const s = this.state;

        const values = [
            s.hairOrFur,
            s.housebroken,
            s.outsideOrInside,
            s.isFixed
        ];
        return values;
    };

    handleBackSection = async () => {
        const {
            id,
            name,
            section,
            hairOrFur,
            housebroken,
            outsideOrInside,
            isFixed
        } = this.state;

        const payload = {
            id,
            hairOrFur,
            housebroken,
            outsideOrInside,
            isFixed
        };

        const sectionSevenData = {
            id,
            name,
            section,
            hairOrFur,
            housebroken,
            outsideOrInside,
            isFixed
        };

        await api.updateSectionSevenById(id, payload).then(res => {
            console.log(`Section Seven Saved`);
            this.props.sectionBack(sectionSevenData);
        });
    };

    handleNextBiography = async () => {
        const {
            id,
            hairOrFur,
            housebroken,
            outsideOrInside,
            isFixed
        } = this.state;

        const payload = {
            id,
            hairOrFur,
            housebroken,
            outsideOrInside,
            isFixed
        };

        await api.updateSectionSevenById(id, payload).then(res => {
            console.log(`Section Seven Saved`);
            this.props.history.push(`/doggos/biography/${id}`);
        });
    };

    render() {
        const {
            name,
            section,
            hairOrFur,
            housebroken,
            outsideOrInside,
            isFixed,
            errors
        } = this.state;

        return (
            <React.Fragment>
                <Label>Please tell us about {name}</Label>
                <br />

                <TemperamentStepper
                    section={section}
                    sendSection={this.sendSection}
                />
                <br />

                <Wrapper>
                    <Label>Hair or Fur? </Label>
                    <ErrorBorder border={errors.hairOrFur && '1px solid red'}>
                        <RadioGroup
                            name='hairOrFurRadio'
                            value={`${hairOrFur}`}
                            onChange={this.handleHairOrFurChange}
                            row
                        >
                            <Radios>
                                <FormControlLabel
                                    value='hair'
                                    control={<Radio color='primary' />}
                                    label='Hair'
                                    labelPlacement='bottom'
                                />
                                <FormControlLabel
                                    value='fur'
                                    control={<Radio color='primary' />}
                                    label='Fur'
                                    labelPlacement='bottom'
                                />
                            </Radios>
                        </RadioGroup>
                    </ErrorBorder>
                    {errors.hairOrFur &&
                        <ValidationMsg field={'Hair or Fur'} />}
                    <br />

                    <Label>Housebroken? </Label>
                    <ErrorBorder border={errors.housebroken && '1px solid red'}>
                        <RadioGroup
                            name='housebrokenRadio'
                            value={housebroken}
                            onChange={this.handleHousebrokenChange}
                            row
                        >
                            <Radios>
                                <FormControlLabel
                                    value='true'
                                    control={<Radio color='primary' />}
                                    label='Yes'
                                    labelPlacement='bottom'
                                />
                                <FormControlLabel
                                    value='false'
                                    control={<Radio color='primary' />}
                                    label='No'
                                    labelPlacement='bottom'
                                />
                            </Radios>
                        </RadioGroup>
                    </ErrorBorder>
                    {errors.housebroken &&
                        <ValidationMsg field={'Housebroken'} />}
                    <br />

                    <Label>Prefers the Outside or Inside? </Label>
                    <ErrorBorder border={errors.outsideOrInside && '1px solid red'}>
                        <RadioGroup
                            name='outsideOrInsideRadio'
                            value={outsideOrInside}
                            onChange={this.handleOutsideOrInsideChange}
                            row
                        >
                            <Radios>
                                <FormControlLabel
                                    value='outside'
                                    control={<Radio color='primary' />}
                                    label='Outside'
                                    labelPlacement='bottom'
                                />
                                <FormControlLabel
                                    value='inside'
                                    control={<Radio color='primary' />}
                                    label='Inside'
                                    labelPlacement='bottom'
                                />
                            </Radios>

                        </RadioGroup>
                    </ErrorBorder>
                    {errors.outsideOrInside &&
                        <ValidationMsg field={'Outside or Inside'} />}
                    <br />

                    <Label>Spayed/Neutered? </Label>
                    <ErrorBorder border={errors.isFixed && '1px solid red'}>
                        <RadioGroup
                            name='isFixedRadio'
                            value={isFixed}
                            onChange={this.handleIsFixedChange}
                            row
                        >
                            <Radios>
                                <FormControlLabel
                                    value='true'
                                    control={<Radio color='primary' />}
                                    label='Yes'
                                    labelPlacement='bottom'
                                />
                                <FormControlLabel
                                    value='false'
                                    control={<Radio color='primary' />}
                                    label='No'
                                    labelPlacement='bottom'
                                />
                            </Radios>
                        </RadioGroup>
                    </ErrorBorder>
                    {errors.isFixed &&
                        <ValidationMsg field={'Is Fixed'} />}
                </Wrapper>

                <TemperamentStepper
                    section={section}
                    sendSection={this.sendSection}
                />

                <Wrapper>
                    <div>
                        <Button onClick={() => this.handleValidation('back')}>Back</Button>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => this.handleValidation('next')}
                        >
                            Next to Biography
                        </Button>
                    </div>
                </Wrapper>
            </React.Fragment >
        );
    };
};

export default SectionSeven;