INSERT INTO diets (name)
VALUES ('Gluten Free'),
('Ketogenic'),
('Vegetarian'),
('Lacto-Vegetarian'),
('Ovo-Vegetarian'),
('Vegan'),
('Pescetarian'),
('Paleo'),
('Primal'),
('Low FODMAP'),
('Whole 30');


UPDATE diets 
SET description = 'All ingredients must be vegetarian and none of the ingredients can be or contain egg.'
WHERE diets.id = 4;