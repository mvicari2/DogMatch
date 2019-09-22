import React, { Component } from 'react';
import api from '../../api';
import styled from 'styled-components';
import { TemperamentStepper } from '../../components'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Wrapper = styled.div.attrs({
    className: 'form-group col-lg-10',
})`
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
`;

const Label = styled.label`
    margin: 5px;
`;

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`;

const Radios = styled.div`
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center !important;
`;

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
            isFixed: sectionSevenData.isFixed
        };
    };

    handleHairOrFurChange = async e => {
        const hairOrFur = e.target.value;
        this.setState({ hairOrFur });
    };

    handleHousebrokenChange = async e => {
        const housebroken = e.target.value;
        this.setState({ housebroken });
    };

    handleOutsideOrInsideChange = async e => {
        const outsideOrInside = e.target.value;
        this.setState({ outsideOrInside });
    };

    handleIsFixedChange = async e => {
        const isFixed = e.target.value;
        this.setState({ isFixed });
    };

    sendSection = async newSection => {
        this.props.sendNewSection(newSection);
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
            isFixed
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
                    <Label>Housebroken? </Label>
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
                    <Label>Prefers the Outside or Inside? </Label>
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
                    <Label>Spayed/Neutered? </Label>
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
                </Wrapper>

                <TemperamentStepper
                    section={section}
                    sendSection={this.sendSection}
                />

                <Wrapper>
                    <div>
                        <Button onClick={this.handleBackSection}>Back</Button>
                        <Button variant='contained' color='primary' onClick={this.handleNextBiography}>
                            Next to Biography
                        </Button>
                    </div>
                </Wrapper>
            </React.Fragment>
        );
    };
};

export default SectionSeven;