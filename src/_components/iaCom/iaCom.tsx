import styled from '@emotion/styled';
import React, { useReducer, useRef, useEffect } from 'react';
import axios from 'axios';

// Interfaces
interface Message {
    text: string;
    sender: 'user' | 'assistant';
}

interface ChatState {
    isOpen: boolean;
    messages: Message[];
    inputMessage: string;
    token: string;
}

type ChatAction =
    | { type: 'TOGGLE_CHAT' }
    | { type: 'ADD_MESSAGE'; payload: Message }
    | { type: 'SET_INPUT'; payload: string }
    | { type: 'SET_TOKEN'; payload: string };

// Styled components
const ChatContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const ChatButton = styled.button`
  background-color: #1da69d;
  color: white;
  border: none;
  border-radius: 50%;
  width: 70px;  
  height: 70px; 
  font-size: 28px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative; 
`;

const ChatButtonOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  cursor: pointer;
  border-radius: 50%;
`;

const ChatBubble = styled.span<{ isVisible: boolean }>`
  position: absolute;
  top: -35px;
  right: 40px;
  background-color: white;
  padding: 10px 14px;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  font-size: 14px;
  white-space: nowrap;
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 0.3s ease;
`;

const ChatModal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 350px;
  height: 500px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.3s ease;
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(100%)'};
  opacity: ${props => props.isOpen ? 1 : 0};
`;

const ChatHeader = styled.div`
  padding: 16px;
  background-color: #1da69d;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatMessages = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const Message = styled.div<{ sender: 'user' | 'assistant' }>`
  margin-bottom: 12px;
  padding: 8px 12px;
  border-radius: 20px;
  max-width: 80%;
  align-self: ${props => props.sender === 'user' ? 'flex-end' : 'flex-start'};
  background-color: ${props => props.sender === 'user' ? '#4299e1' : '#e2e8f0'};
  color: ${props => props.sender === 'user' ? 'white' : 'black'};
`;

const ChatInput = styled.div`
  display: flex;
  padding: 16px;
  background-color: #f7fafc;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  margin-right: 8px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #4299e1;
  }
`;

const SendButton = styled.button`
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3182ce;
  }
`;

// Chat reducer
const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
    switch (action.type) {
        case 'TOGGLE_CHAT':
            return { ...state, isOpen: !state.isOpen };
        case 'ADD_MESSAGE':
            return { ...state, messages: [...state.messages, action.payload] };
        case 'SET_INPUT':
            return { ...state, inputMessage: action.payload };
        case 'SET_TOKEN':
            return { ...state, token: action.payload };
        default:
            return state;
    }
};

const fetchAssistantResponse = async (message: string, token: string) => {
    try {
        const response = await axios.post('http://194.164.165.239:8080/api/openai/chat/', { message }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        return response.data || 'No response from assistant';
    } catch (error) {
        console.error('Error fetching assistant response:', error);
        return 'Hubo un error al obtener la respuesta.';
    }
};

// Hook for chat logic
const useChatLogic = () => {
    const initialState: ChatState = {
        isOpen: false,
        messages: [],
        inputMessage: '',
        token: '',
    };

    const [state, dispatch] = useReducer(chatReducer, initialState);

    const toggleChat = () => dispatch({ type: 'TOGGLE_CHAT' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        dispatch({ type: 'SET_INPUT', payload: e.target.value });

    const handleSendMessage = async () => {
        if (state.inputMessage.trim() !== '') {
            const userMessage: Message = { text: state.inputMessage, sender: 'user' };
            dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
            dispatch({ type: 'SET_INPUT', payload: '' });

            const assistantReply = await fetchAssistantResponse(state.inputMessage, state.token);

            dispatch({
                type: 'ADD_MESSAGE',
                payload: { text: assistantReply, sender: 'assistant' }
            });
        }
    };

    return { state, toggleChat, handleInputChange, handleSendMessage, dispatch };
};

const ChatAssistant: React.FC = () => {
    const { state, toggleChat, handleInputChange, handleSendMessage, dispatch } = useChatLogic();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (state.isOpen) {
            inputRef.current?.focus();
        }
    }, [state.isOpen]);

    useEffect(() => {
        const fetchToken = () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                dispatch({ type: 'SET_TOKEN', payload: token });
            } else {
                console.error('No token found in localStorage');
            }
        };

        fetchToken();
    }, [dispatch]);

    return (
        <ChatContainer>
            <ChatButton onClick={toggleChat}>
                <img src="/img/helper.png" alt="IA" style={{ width: '70px', height: '70px' }} />
                <ChatBubble style={{ backgroundColor: "#104b4b" }} isVisible={!state.isOpen}>
                    ¿Te puedo ayudar en algo?
                </ChatBubble>
                <ChatButtonOverlay onClick={toggleChat} />
            </ChatButton>

            <ChatModal isOpen={state.isOpen}>
                <ChatHeader>
                    <h3>Asistente Virtual</h3>
                    <button onClick={toggleChat}>✕</button>
                </ChatHeader>
                <ChatMessages>
                    {state.messages.map((message, index) => (
                        <Message key={index} sender={message.sender}>
                            {message.text}
                        </Message>
                    ))}
                </ChatMessages>
                <ChatInput>
                    <Input
                        ref={inputRef}
                        type="text"
                        value={state.inputMessage}
                        onChange={handleInputChange}
                        placeholder="Escribe tu mensaje..."
                        onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <SendButton onClick={handleSendMessage}>Enviar</SendButton>
                </ChatInput>
            </ChatModal>
        </ChatContainer>
    );
};

export default ChatAssistant;
