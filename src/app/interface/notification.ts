export interface NotificationRequest
{
  id: string;
  user_name: string;
  host_name: string;
  service_name: string;
};

export interface NotificationReply
{
  id: string;
  authorize: boolean;
};