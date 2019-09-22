import React, { Component } from 'react';
import styled from 'styled-components';
import '../../../node_modules/react-vis/dist/style.css';
import {
    XYPlot,
    VerticalBarSeries,
    VerticalGridLines,
    HorizontalGridLines,
    XAxis,
    YAxis,
    makeWidthFlexible
} from 'react-vis';

const FlexibleXYPlot = makeWidthFlexible(XYPlot);

const Label = styled.h3`
    margin: 5px;
    color: #616b61;
    text-align: center;
`;

class ProfileGraph extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.id,
            temperament: this.props.temperament,
            dataMap: []
        };
    };

    componentDidMount = async () => {
        const { temperament } = this.state;

        // Set Doggo Scores (out of 100)
        //
        // 1. Playfulness
        const playfullnessScore = (
            ((
                temperament.playfulness +
                temperament.likesPlayingHumans +
                temperament.likesPlayingDogs +
                temperament.playsFetch +
                temperament.likesToys +
                temperament.likesTreats
            ) / 30)
            * 100
        );

        // 2. Friendliness
        const friendlinessScore = (
            ((
                temperament.friendlinessOverall +
                temperament.goodWithPeople +
                temperament.goodWithOtherDogs +
                temperament.goodWithCats +
                temperament.goodWithOtherAnimals +
                temperament.goodWithChildren
            ) / 30)
            * 100
        );

        // 3. Athletiscm
        const athleticScore = (
            ((
                temperament.athleticLevel +
                temperament.likesExcersize +
                temperament.balanceStability
            ) / 15)
            * 100
        );

        // 4. Training
        const trainingScore = (
            ((
                temperament.trainingLevel +
                temperament.trainability +
                temperament.intelligence
            ) / 15)
            * 100
        );

        // 5. Empathy
        const empathyScore = (
            ((
                temperament.empathetic +
                temperament.intelligence
            ) / 10)
            * 100
        );

        // 6. Intellgience
        const intelligenceScore = (
            ((
                temperament.intelligence
            ) / 5)
            * 100
        );

        // 7. Agression
        const aggressionScore = (
            ((
                temperament.aggressionLevel +
                temperament.barking +
                temperament.preyDrive
            ) / 15)
            * 100
        );

        // 8. Fearful & Anxiety
        const anxietyScore = (
            ((
                temperament.anxiety +
                temperament.fearful +
                temperament.isAfraidFireworks
            ) / 15)
            * 100
        );

        // 9. Insitincts (primal)
        const instinctScore = (
            ((
                temperament.preyDrive +
                temperament.distinguishThreatening +
                temperament.protectiveness +
                temperament.senseOfSmell
            ) / 20)
            * 100
        );

        // 10. confidence (uses difference between confidence and anxiety)
        var overallConfidence = 0;
        if (temperament.confidence > temperament.anxiety) {
            overallConfidence = temperament.confidence - temperament.anxiety;
        } else {
            overallConfidence = 5 - (temperament.anxiety - temperament.confidence);
        };
        const confidenceScore = (
            ((
                overallConfidence
            ) / 5)
            * 100
        );

        // 11. Subbornness / Picky Eater
        const stubbornnessScore = (
            ((
                temperament.stubbornness +
                temperament.isPickyEater
            ) / 10)
            * 100
        );

        // 12. Shedding Score
        const sheddingScore = (
            ((
                temperament.shedding
            ) / 5)
            * 100
        );

        // 13. Smell Score
        const smellScore = (
            ((
                temperament.smellRating
            ) / 5)
            * 100
        );

        // set dataMap array for graph data
        var dataMap = [
            { y: playfullnessScore, x: 'Playfullness' },
            { y: friendlinessScore, x: 'Friendliness' },
            { y: athleticScore, x: 'Athletic' },
            { y: trainingScore, x: 'Training' },
            { y: empathyScore, x: 'Empathy' },
            { y: intelligenceScore, x: 'Intelligence' },
            { y: aggressionScore, x: 'Aggression' },
            { y: anxietyScore, x: 'Anxiety' },
            { y: instinctScore, x: 'Instinct' },
            { y: confidenceScore, x: 'Confidence' },
            { y: stubbornnessScore, x: 'Stubbornness' },
            { y: sheddingScore, x: 'Shedding' },
            { y: smellScore, x: 'Smell' }
        ];

        this.setState({ dataMap });
    };

    render() {
        const { dataMap } = this.state;

        return (
            <React.Fragment>
                <Label>Temperament and Personality Scores</Label>
                <FlexibleXYPlot
                    height={400}
                    xType='ordinal'
                    yDomain={[0, 100]}
                >
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <VerticalBarSeries data={dataMap} />
                </FlexibleXYPlot>
            </React.Fragment>
        );
    };
};

export default ProfileGraph;