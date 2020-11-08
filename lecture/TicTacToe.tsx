import * as React from 'react'; //* as 이방식으로 불러오면React{ useState }이렇게 한줄에는 못쓴다.
import { useState, useCallback, useReducer, Reducer } from 'react';
import Table from './Table';

interface ReducerState { //initialState의 타입지정을 위해 있는 interface
    winner: 'O' | 'X' | '',
    turn: 'O' | 'X',
    tableData: string[][],
    recentCell: [number, number].
}

const initialState: ReducerState = { //리듀서의 역할은 흩어져있던 스테이트들을 하나의 스테이트(여기서는 initialState)로 관리하는게 리듀서의 역할이다. 쉽게 말해서 스테이트들의 중앙관리자라고도 할수 있다.
    winner: '',
    turn: 'O',
    tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ],
    recentCell: [-1, -1],
};

export const SET_WINNER = 'SET_WINNER' as const; //승자를 결정짓는 액션
export const CLICK_CELL = 'CLICK_CELL' as const; //틱택토의 칸을 눌렀을때 액션
export const CHANGE_TURN = 'CHANGE_TURN' as const; //턴을 바꾸는 액션
export const RESET_GAME = 'RESET_GAME' as const; //게임을 초기화하는 액션

interface SetWinnerAction { 
    type: typeof SET_WINNER;
    winner: 'O' | 'X';
};

const SetWinner = (winner: 'O' | 'X'): SetWinnerAction => { // : 'O' | 'X'는 매개변수의 타입을 지정한 것이고 : SetWinnerAction는 함수리턴값의 타입을 지정한 것이다.
    return { type:SET_WINNER, winner };
};

interface ClickCellAction { 
    type: typeof CLICK_CELL;
    row: number;
    cell: number;
};

const ClickCell = (row: number, cell: number): ClickCellAction => {
    return { type: CLICK_CELL, row, cell };
};

interface ChangeTurnAction { 
    type: typeof CHANGE_TURN;
};

interface ResetGameAction { 
    type: typeof RESET_GAME;
};

type ReducerActions = SetWinnerAction | ClickCellAction | ChangeTurnAction | ResetGameAction;

const reducer = (state: ReducerState, action: ReducerActions ): ReducerState => { //스테이트랑 액션을 매개변수로 받아서 스테이트를 리턴하는 함수이다. 이함수의 리턴값의 타입은 ReducerState이다.(이함수의 역할은 기존의 스테이트를 액션을 통해서 새로운 스테이트로 바꿔내는 것이다.)
    switch (action.type) {
        case SET_WINNER:
            // state.winner = action.winner; 이렇게 하면 안됨.
            return {
                ...state,
                winner: action.winner,
            };
        case CLICK_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 해결
            tableData[action.row][action.cell] = state.turn;
            return {
                ...state,
                tableData,
                recentCell: [action.row, action.cell],
            };
        }
        case CHANGE_TURN: {
            return {
              ...state,
              turn: state.turn === 'O' ? 'X' : 'O',
            };
        }
        case RESET_GAME: { //스테이트초기화
            return {
              ...state,
              turn: 'O',
              tableData: [
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],
              ],
              recentCell: [-1, -1],
            };
        }
        default: 
            return state;
    }
};

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, turn, winner, recentCell } = state;

    const onClickTable = useCallback(() => {
        dispatch(SetWinner('O'));
    }, []);

    return (
        <>
          <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
          {winner && <div>{winner}님의 승리</div>}
        </>
      )
}

export default TicTacToe;