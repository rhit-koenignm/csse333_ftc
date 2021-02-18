do $$ begin
perform register_user('user@gmail.com', 'yes@123', 'test', 'user');
end $$;

do $$ begin
perform login_user('user@gmail.com', 'yes@123');
end $$;