INSERT INTO global_control (page, is_button_disabled, is_input_disabled, is_table_visible) VALUES
    ('/page-one', FALSE, FALSE, TRUE),
    ('/page-two', FALSE, FALSE, TRUE),
    ('/page-three', FALSE, FALSE, TRUE)
ON CONFLICT(page) DO NOTHING;
