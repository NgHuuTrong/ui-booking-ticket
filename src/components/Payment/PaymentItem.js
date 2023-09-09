import { CheckBox, ListItem } from "@rneui/themed"
import { useState } from "react"
import { Image, Pressable } from "react-native"
import { View } from "react-native"

export const PaymentItem = ({ payment, index, checked, handleSetPaymentMethod }) => {
    return (
        <ListItem
            key={index}
        >
            <ListItem.Content>
                <Pressable
                    className="flex-row items-center w-full"
                    onPress={() => handleSetPaymentMethod({
                        ...payment,
                        index
                    })}
                >
                    <CheckBox
                        checked={checked}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        onPress={() => handleSetPaymentMethod({
                            ...payment,
                            index
                        })}
                    />
                    <Image
                        source={payment.image}
                        style={{
                            width: 100,
                            height: 50
                        }}
                    />
                </Pressable>
            </ListItem.Content>
        </ListItem>
    )
}