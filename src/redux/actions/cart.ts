
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import { IRequest, REQUEST } from '../../services/api';
import { GET_PRODUCT } from '../../services/cart';


export const getProduct = createAsyncThunk('cart/get_product', async (ean: string, thunkAPI) => {
    try {
        const response: IRequest|undefined = await REQUEST("GET", GET_PRODUCT+"/"+ean+".json", {})
        if(response){
            if (response.status == 404) {
                Alert.alert(
                    'Erro no código de barras',
                    'Ocorreu um erro ao encontrar o código de barras, tente novamente',
                );
                return undefined
            }else if(response.status == 200){
                return response.data
            }
        }        
    } catch {
        console.log("catch get_product")
        return null
    }
})