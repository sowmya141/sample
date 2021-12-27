import React, { Component } from 'react';
import { View, Text, Left, Right, Thumbnail, Subtitle, Body, ListItem } from 'native-base';
export default class EmployeeItem extends Component {
    data: any;
    constructor(props) {
        super(props);
        this.data = props.data;
    }
    render() {
        return (
            <ListItem thumbnail>
                <Left>
                    <Thumbnail resizeMode='contain'
                        source={{ uri: this.data.profileImage != null ? this.data.profileImage : "https://ibb.co/4P0pkSS" }}
                        style={{ width: 80, height: 60, borderRadius: 10, marginRight: 5 }} />
                </Left>
                <Body>
                    <Text>{this.data.firstName} </Text>
                    <Text numberOfLines={2}>{this.data.designation}</Text>
                </Body>
                <Right>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Subtitle> {this.data.email} </Subtitle>
                        <Subtitle> {this.data.phone} </Subtitle>
                    </View>
                </Right>
            </ListItem>
        );
    }
}