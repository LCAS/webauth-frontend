// see: "unix_account_authorization/message_protocol.py"

export enum MessageType
{
  REQUEST = "authorization_request",
  RESPONSE = "authorization_response",
  UPDATE = "authorization_update",
  ERROR = "error"
};

export enum MessageState
{
  WAITING = "WAITING",
  EXPIRED = "EXPIRED",
  AUTHORIZED = "AUTHORIZED",
  UNAUTHORIZED = "UNAUTHORIZED",
  ERROR = "ERROR"
};

export interface Message
{
  type: MessageType;
};

export interface MessageRequest
{
  type: MessageType;
  id: string;
  unix_account_name: string;
  hostname: string;
  service_name: string;
};

export interface MessageUpdate
{
  type: MessageType;
  id: string;
  unix_account_name: string;
  state: MessageState;
};

export interface MessageReply
{
  type: MessageType;
  id: string;
  state: MessageState;
};

export interface MessageError
{
  type: MessageType;
  error_text: string;
};