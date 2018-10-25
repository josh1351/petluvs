import React from 'react';
import {Share,Text, View, StyleSheet, SafeAreaView, Image, ImageBackground, Dimensions,ScrollView,TouchableOpacity,Linking} from 'react-native';
var {height, width} = Dimensions.get('window');
import { Row, Column as Col, ScreenInfo, Grid} from 'react-native-responsive-grid';
const ICON_PLUS_BASE64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==';

const sizes = {sm: 50, md: 25, lg: 12.5, xl: 10}

const layout = (state) => {

    const numCols = Math.floor(100/sizes[ScreenInfo().mediaSize])
    const numRows = Math.ceil(data.length / numCols)
    const colWidth = state.layout.grid ? state.layout.grid.width / numCols : 0

    let layoutMatrix = [], layoutCols = []

    for (let col = 0; col < numCols; col++) {
        layoutMatrix.push([])
        for (let row = 0, i = col; row < numRows; row++, i += numCols) {
            if (data[i])
                layoutMatrix[col].push(
                    <Item
                        key={i}
                        id={i}
                        name={data[i].name}
                        url={data[i].url}
                        height={data[i].pixelHeight}
                        width={data[i].pixelWidth}
                        margin={15}
                        colWidth={colWidth}
                        state={state}
                    />
                )
        }
        layoutCols.push(
            <Col
                key={col}
                smSize={state.layout.grid ? sizes.sm : 0 }
                mdSize={state.layout.grid ? sizes.md : 0 }
                lgSize={state.layout.grid ? sizes.lg : 0 }
                xlSize={state.layout.grid ? sizes.xl : 0 }
            >
                {layoutMatrix[col]}
            </Col>
        )
    }

    return layoutCols
}

const Item = (props) => {
    console.log(props)
    if (!props.colWidth)  return null

    return (
        
        <Row
            style={{
                backgroundColor: 'white',
                margin:5, borderRadius: 5,
            }}
        >
            <Col fullWidth>
            <TouchableOpacity onLongPress={() => {
                                          Share.share({
                                            title:"Shared via Petluvs",
                                            message: "Shared via Petluvs",
                                            url: props.url,
                                       });}}
                             >
                             {/*onPress={()=>Linking.openURL('mailto:Admin@petluvs.com?subject=SendMail&body=Description') }>*/}
                <ImageBackground
                    source={{uri: props.url }} 
                    style={{
                        width: props.colWidth,
                        height: props.height + ((props.colWidth - props.width) * props.height/props.width),
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}

               />
                <TouchableOpacity
                    style={{alignItems:'flex-end',justifyContent:'flex-end',height:30,width:30,borderTopLeftRadius:35,backgroundColor:'#e55595',opacity:.7,position:'absolute',right:0,bottom:0}}
                    onPress={() => Linking.openURL('mailto:Admin@petluvs.com?subject=Report about it&body=body')}
                >
                    <Image
                        style={{marginRight: 5,marginBottom: 5}}
                        source={require('./../assets/envelope.png')}
                    />
                </TouchableOpacity>
</TouchableOpacity>

            </Col>
        </Row>
    )}

export const SearchImages = () => (
    <Grid>{({state, setState}) => (
        <Row fullHeight>
            <ScrollView removeClippedSubviews={true} >
                <Row>
                    {layout(state)}
                </Row>
            </ScrollView>
        </Row>
    )}
    </Grid>)

const data = [
    {
        name:'Bella',
        url: 'https://placeimg.com/640/640/nature',
        pixelHeight: 354,
        pixelWidth: 236
    },
    {
        name:'Max',
        url:  'https://placeimg.com/640/640/people',
        pixelHeight: 157,
        pixelWidth: 236
    },
    {
        name:'Archie',
        url:'https://placeimg.com/640/640/animals',
        pixelHeight: 289,
        pixelWidth: 236
    },
    {
        name:'Buddy',
        url: 'https://placeimg.com/640/640/beer',
        pixelHeight: 289,
        pixelWidth: 236
    },
    {
        name:'Gaurav',
        url: 'https://placeimg.com/640/640/animals',
        pixelHeight: 326,
        pixelWidth: 236
    },
    {
        name:'Abc',
        url: 'https://placeimg.com/640/640/beer',
        pixelHeight: 354,
        pixelWidth: 236
    },
]


export default SearchImages;