/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";

export default {
  mutation: {
    updateNamHoc: (fragment) => gql`
        mutation UPDATE_HOCKY($inputs: HocKyInput!, $maHocKy: ID!){
            updateHocKy(
                inputs: $inputs
                maHocKy: $maHocKy
            ) {
              status
              message
              errors {
                message
                error_fields
              }
              data {
                hocKyId
                namBatDau
                namKetThuc
                moTa
              }
            }
          }
        `
  }
}