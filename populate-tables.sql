INSERT INTO state (id, name) VALUES
    (1, 'California'),
    (2, 'New York'),
    (3, 'Texas'),
    (4, 'Florida'),
    (5, 'Illinois'),
    (6, 'Ohio'),
    (7, 'Georgia'),
    (8, 'Michigan'),
    (9, 'Pennsylvania'),
    (10, 'Arizona');

 INSERT INTO city (id, state_id, name) VALUES
    (1, 1, 'Los Angeles'),
    (2, 1, 'San Francisco'),
    (3, 2, 'New York City'),
    (4, 2, 'Buffalo'),
    (5, 3, 'Houston'),
    (6, 3, 'Austin'),
    (7, 4, 'Miami'),
    (8, 4, 'Tampa'),
    (9, 5, 'Chicago'),
    (10, 5, 'Springfield');


INSERT INTO address (id, user_id, complement, number, cep, city_id) VALUES
    (1, 101, 'Apt 302', 123, '12345-678', 1),
    (2, 102, 'No complement', 456, '98765-432', 3),
    (3, 103, 'House 5', 789, '54321-876', 5),
    (4, 104, 'Unit B', 321, '23456-789', 7),
    (5, 105, 'Default complement', 654, '87654-321', 9),
    (6, 106, 'Suite 10', 987, '34567-890', 2),
    (7, 107, 'No complement', 1234, '56789-012', 4),
    (8, 108, 'Apt 501', 5678, '89012-345', 6),
    (9, 109, 'Unit C', 9012, '67890-123', 8),
    (10, 110, 'Default complement', 3456, '45678-901', 10);