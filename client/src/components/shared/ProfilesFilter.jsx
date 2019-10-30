import React, { Component } from 'react';
import styled from 'styled-components';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import resources from '../../resources/resources';
import Checkbox from '@material-ui/core/Checkbox';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-modal';
import { IoIosClose } from 'react-icons/io';

Modal.setAppElement('#root');
const animatedComponents = makeAnimated();

const filterStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxHeight: '90%'
    }
};

const Radios = styled.div`
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
`;

const Wrapper = styled.div.attrs({
    className: 'form-group col-sm-8',
})`    
    margin-left: auto;
    margin-right: auto;
    text-align: center;
`;

const Label = styled.label`
    margin: 5px;
`;

const SearchLabel = styled.label`
    margin: 5px;
    margin-top: 15px
    display: inline;
`;

const Button = styled.button.attrs({
    className: `btn btn-outline-primary btn-sm`,
})`
    margin: 15px 15px 15px 5px;
    display: inline;
`;

const ClearButton = styled.button.attrs({
    className: `btn btn-outline-danger btn-sm`,
})`
    margin: 15px 15px 15px 5px;
    display: inline;
`;

const CloseModalIcon = styled.div`
    margin: 5px;   
    text-align: right; 
`;

const FilterRow = styled.div.attrs({
    className: 'form-group row justify-content-center',
})`
    max-width: 100%;
    margin-top: -20px;
`;

const InputWrapper = styled.span`
    display: block;
    margin-right: 10px;
    margin-top: 15px;    
`;

class ProfilesFilter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalIsOpen: false,
            searchString: '',
            includeBio: false,
            showingResults: false,
            filterParams: {
                // dropdowns
                ageRange: {
                    low: 0,
                    high: 30
                },
                // radios
                orderBy: '0',
                ageOrder: '0',
                nameOrder: '0',
                weightOrder: '0',
                breedOrder: '0',
                genderFilter: 'all'
            }
        };
    };

    handleClearFilter = async () => {
        const { filterParams } = this.state;

        this.props.clearFilter(filterParams);
        this.setState({
            modalIsOpen: false,
            filterParams: {
                // dropdowns
                ageRange: {
                    low: 0,
                    high: 30
                },
                // radios
                orderBy: '0',
                ageOrder: '0',
                nameOrder: '0',
                weightOrder: '0',
                breedOrder: '0',
                genderFilter: 'all'
            }
        });
    };

    handleSubmitFilter = async () => {
        const { filterParams } = this.state;
        this.props.handleFilter(filterParams);
        this.setState({ modalIsOpen: false });
    };

    handleAgeRangeLow = async e => {
        const { filterParams } = this.state;
        filterParams.ageRange.low = e.value;
        this.setState({ filterParams });
    };

    handleAgeRangeHigh = async e => {
        const { filterParams } = this.state;
        filterParams.ageRange.high = e.value;
        this.setState({ filterParams });
    };

    handleAgeOrderChange = async e => {
        const { filterParams } = this.state;
        filterParams.ageOrder = e.target.value;
        this.setState({ filterParams });
    };

    handleNameOrderChange = async e => {
        const { filterParams } = this.state;
        filterParams.nameOrder = e.target.value;
        this.setState({ filterParams });
    };

    handleBreedOrderChange = async e => {
        const { filterParams } = this.state;
        filterParams.breedOrder = e.target.value;
        this.setState({ filterParams });
    };

    handleWeightOrderChange = async e => {
        const { filterParams } = this.state;
        filterParams.weightOrder = e.target.value;
        this.setState({ filterParams });
    };

    handleGenderFilterChange = async e => {
        const { filterParams } = this.state;
        filterParams.genderFilter = e.target.value;
        this.setState({ filterParams });
    };

    handleOrderByChange = async e => {
        const { filterParams } = this.state;
        filterParams.orderBy = e.target.value;
        this.setState({ filterParams });
    };

    handleOpenModal = () => {
        this.setState({ modalIsOpen: true });
    };

    handleAfterOpenModal = () => {
        this.subtitle.style.color = '#f00';
    };

    handleCloseModal = () => {
        this.setState({ modalIsOpen: false });
    };

    handleSwitchProfiles = () => {
        this.props.switchProfiles();
    };

    handleSearchString = async e => {
        const searchString = e.target.value;
        this.setState({ searchString });
    };

    handleSubmitSearch = async () => {
        const { searchString, includeBio } = this.state;
        const search = {
            searchString,
            includeBio
        };

        this.props.searchProfiles(search);
        this.setState({ showingResults: true });
    };

    handleClearSearch = async () => {
        this.props.clearSearch();
        this.setState({
            searchString: '',
            showingResults: false
        });
    };

    handleIncludeBioChange = async e => {
        this.setState({ includeBio: true });
    };

    // submit search if user presses enter key with search form field selected
    handleKeyPress = async e => {
        if (e.charCode === 13) {
            this.handleSubmitSearch();
        };
    };

    render() {
        const { isFiltered, showTable } = this.props;
        const {
            modalIsOpen,
            filterParams,
            searchString,
            showingResults
        } = this.state;

        return (
            <React.Fragment>
                <FilterRow>
                    <SearchLabel>Search</SearchLabel>

                    <InputWrapper>
                        <Form.Control
                            type='text'
                            size='sm'
                            onChange={this.handleSearchString}
                            onKeyPress={this.handleKeyPress}
                            value={searchString}
                        />
                    </InputWrapper>

                    <Button onClick={this.handleSubmitSearch}>
                        Search
                    </Button>

                    <FormControlLabel
                        control={<Checkbox color='primary' />}
                        label='Include Biography in Search'
                        labelPlacement='end'
                        onChange={this.handleIncludeBioChange}
                    />

                    {showingResults
                        ? <ClearButton onClick={this.handleClearSearch}>
                            Clear Search
                            </ClearButton>
                        : null}
                </FilterRow>

                <FilterRow>
                    {showTable
                        ? <Button onClick={this.handleSwitchProfiles}>
                            Show Profiles as Cards
                            </Button>
                        : <Button onClick={this.handleSwitchProfiles}>
                            Show Profiles as Table
                            </Button>}

                    <Button onClick={this.handleOpenModal}>
                        Filter Profiles
                        </Button>

                    {isFiltered
                        ? <ClearButton onClick={this.handleClearFilter}>
                            Clear Filter
                            </ClearButton>
                        : null}
                </FilterRow>

                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={this.handleAfterOpenModal}
                    onRequestClose={this.handleCloseModal}
                    style={filterStyle}
                    contentLabel='Filter Profiles Modal'
                >
                    <h2 ref={subtitle => this.subtitle = subtitle}> </h2>
                    <CloseModalIcon>
                        <IoIosClose
                            onClick={this.handleCloseModal}
                            size={30}
                        />
                    </CloseModalIcon>
                    <Wrapper>
                        <Row>
                            <Col sm={true}>
                                <Label>Age Range Start: </Label>
                                <Select
                                    components={animatedComponents}
                                    options={resources.ageRange}
                                    value={{
                                        value: filterParams.ageRange.low,
                                        label: filterParams.ageRange.low
                                    }}
                                    onChange={this.handleAgeRangeLow}
                                />
                            </Col>
                            <Col sm={true}>
                                <Label>Age Range End: </Label>
                                <Select
                                    components={animatedComponents}
                                    options={resources.ageRange}
                                    value={{
                                        value: filterParams.ageRange.high,
                                        label: filterParams.ageRange.high
                                    }}
                                    onChange={this.handleAgeRangeHigh}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Divider />

                        <Row>
                            <Col sm={true}>
                                <Label>Order By: </Label>
                                <RadioGroup
                                    name='orderByRadio'
                                    value={filterParams.orderBy}
                                    onChange={this.handleOrderByChange}
                                    row
                                >
                                    <Radios>
                                        <FormControlLabel
                                            value='1'
                                            control={<Radio color='primary' />}
                                            label='Age'
                                            labelPlacement='bottom'
                                        />
                                        <FormControlLabel
                                            value='2'
                                            control={<Radio color='primary' />}
                                            label='Name'
                                            labelPlacement='bottom'
                                        />
                                        <FormControlLabel
                                            value='3'
                                            control={<Radio color='primary' />}
                                            label='Breed'
                                            labelPlacement='bottom'
                                        />
                                        <FormControlLabel
                                            value='4'
                                            control={<Radio color='primary' />}
                                            label='Weight'
                                            labelPlacement='bottom'
                                        />
                                    </Radios>
                                </RadioGroup>
                            </Col>
                        </Row>
                        <Divider />
                        <br />

                        {filterParams.orderBy !== '0'
                            ?
                            <Row>
                                <Col sm={true}>
                                    {filterParams.orderBy === '1'
                                        ?
                                        <div>
                                            <Label>Order Ages: </Label>
                                            <RadioGroup
                                                name='ageOrderRadio'
                                                value={filterParams.ageOrder}
                                                onChange={this.handleAgeOrderChange}
                                                row
                                            >
                                                <Radios>
                                                    <FormControlLabel
                                                        value='1'
                                                        control={<Radio color='primary' />}
                                                        label='Youngest First'
                                                        labelPlacement='bottom'
                                                    />
                                                    <FormControlLabel
                                                        value='2'
                                                        control={<Radio color='primary' />}
                                                        label='Oldest First'
                                                        labelPlacement='bottom'
                                                    />
                                                </Radios>
                                            </RadioGroup>
                                        </div>
                                        : null}

                                    {filterParams.orderBy === '2'
                                        ?
                                        <div>
                                            <Label>Order Names: </Label>
                                            <RadioGroup
                                                name='nameOrderRadio'
                                                value={filterParams.nameOrder}
                                                onChange={this.handleNameOrderChange}
                                                row
                                            >
                                                <Radios>
                                                    <FormControlLabel
                                                        value='1'
                                                        control={<Radio color='primary' />}
                                                        label='A - Z'
                                                        labelPlacement='bottom'
                                                    />
                                                    <FormControlLabel
                                                        value='2'
                                                        control={<Radio color='primary' />}
                                                        label='Z - A'
                                                        labelPlacement='bottom'
                                                    />
                                                </Radios>
                                            </RadioGroup>
                                        </div>
                                        : null}

                                    {filterParams.orderBy === '3'
                                        ?
                                        <div>
                                            <Label>Order Breeds: </Label>
                                            <RadioGroup
                                                name='breedOrderRadio'
                                                value={filterParams.breedOrder}
                                                onChange={this.handleBreedOrderChange}
                                                row
                                            >
                                                <Radios>
                                                    <FormControlLabel
                                                        value='1'
                                                        control={<Radio color='primary' />}
                                                        label='A-Z'
                                                        labelPlacement='bottom'
                                                    />
                                                    <FormControlLabel
                                                        value='2'
                                                        control={<Radio color='primary' />}
                                                        label='Z-A'
                                                        labelPlacement='bottom'
                                                    />
                                                </Radios>
                                            </RadioGroup>
                                        </div>
                                        : null}

                                    {filterParams.orderBy === '4'
                                        ?
                                        <div>
                                            <Label>Order Weights: </Label>
                                            <RadioGroup
                                                name='breedOrderRadio'
                                                value={filterParams.weightOrder}
                                                onChange={this.handleWeightOrderChange}
                                                row
                                            >
                                                <Radios>
                                                    <FormControlLabel
                                                        value='1'
                                                        control={<Radio color='primary' />}
                                                        label='Lowest 1st'
                                                        labelPlacement='bottom'
                                                    />
                                                    <FormControlLabel
                                                        value='2'
                                                        control={<Radio color='primary' />}
                                                        label='Highest 1st'
                                                        labelPlacement='bottom'
                                                    />
                                                </Radios>
                                            </RadioGroup>
                                        </div>
                                        : null}
                                </Col>
                            </Row>
                            : null}

                        {filterParams.orderBy !== '0'
                            ? <Divider />
                            : null}

                        <Row>
                            <Col sm={true}>
                                <Label>Filter By Gender: </Label>
                                <RadioGroup
                                    name='genderOrderRadio'
                                    value={filterParams.genderFilter}
                                    onChange={this.handleGenderFilterChange}
                                    row
                                >
                                    <Radios>
                                        <FormControlLabel
                                            value='female'
                                            control={<Radio color='primary' />}
                                            label='female'
                                            labelPlacement='bottom'
                                        />
                                        <FormControlLabel
                                            value='male'
                                            control={<Radio color='primary' />}
                                            label='male'
                                            labelPlacement='bottom'
                                        />
                                    </Radios>
                                </RadioGroup>
                            </Col>
                        </Row>
                        <Button onClick={this.handleSubmitFilter}>Filter Profiles</Button>
                        <ClearButton onClick={this.handleClearFilter}>Clear Filter</ClearButton>
                    </Wrapper>
                </Modal>
            </React.Fragment>
        );
    };
};

export default ProfilesFilter;