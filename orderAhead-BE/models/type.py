from models.postgres_db import Postgres_DB
from models.base import Base
from models.product import Product
from models.brand import Brand
import json
from common import sanitize_title, sanitize_handle

class Type(Base):
  DEFAULT_IMAGE = 'https://images.dutchie.com/f0d012f401f84d82452884e213477bcc?auto=format&fit=fill&fill=solid&fillColor=%23fff&__typename=ImgixSettings&ixlib=react-9.0.2&h=344&w=344&q=75&dpr=1'
  allow_fields = {
    'name': 'Name',
    'image_url': 'Image_Url',
  }

  def __init__(self, name):
    self.id = name
    self.data = {}

  @classmethod
  def get_list(cls, options={}):
    select_fields = cls.get_select_fields()
    sql = f'SELECT {select_fields} FROM "Product_Types";'
    return Postgres_DB.fetchall(sql, (), cls.build_type)

  def load_data(self):
    select_fields = self.get_select_fields()
    sql = f'SELECT {select_fields} FROM "Product_Types" WHERE "Name" = %s LIMIT 1;'

    Postgres_DB.fetchone(sql, (self.id, ), self.build_data)

  def build_data(self, db_record):
    self.data = {}
    for index, field in enumerate(self.allow_fields.keys()):
      self.data[field] = db_record[index]

    return self.data

  def get_brand_list(self):
    sql = f'SELECT DISTINCT "Brand" FROM "Inventory" WHERE "Product Type" = %s;'

    return Postgres_DB.fetchall(sql, (self.id,), Brand.build_category)

  @classmethod
  def build_type(cls, db_record):
    product_type = cls(db_record[0])
    product_type.build_data(db_record)
    return product_type

  def toJSON(self):
    if not self.image_url:
      self.image_url = Type.DEFAULT_IMAGE

    price_from = 100
    price_to = 200

    return {'name':self.name, 'thumbnail': self.image_url, 'handle':sanitize_handle(self.name), 'price_range': {'from': price_from, 'to': price_to}}