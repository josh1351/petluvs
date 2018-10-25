
const quickactions=()=>{
    this.getItem();
    if(this.state.token){
        return(

            <View style={{position:'absolute',left:(width/2)-40,bottom:0}}>
                <QuickActions onPress={() => { this.props.navigation.goBack() }} />
            </View>
        );
    }