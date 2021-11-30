from models.postgres_db import Postgres_DB
class ProductMedia:
  @staticmethod
  def add_media(product_sku, media_path, media_type):
    sql = 'INSERT INTO "Product_Medias"("Product Sku", "Media Path", "Media Type") VALUES (%s, %s, %s) RETURNING "Media ID"'
    media_id = Postgres_DB.query(sql, (product_sku, media_path, media_type))
    return {
      'media_id': media_id,
      'product_sku': product_sku,
      'media_path': media_path,
      'media_type': media_type,
    }

  @staticmethod
  def delete_media(media_id):
    sql = 'DELETE FROM "Product_Medias" WHERE "Media ID" = %s'
    Postgres_DB.query(sql, (media_id, ))
    return media_id

  @staticmethod
  def get_product_media_items(product_sku):
    sql = '''
      SELECT "Media ID", "Media Path", "Media Type" FROM "Product_Medias" WHERE "Product Sku" = %s
    '''

    return Postgres_DB.fetchall(sql, (product_sku, ), lambda db_record: {'media_id': db_record[0], 'media_path': db_record[1],
      'media_thumbnail': ProductMedia.get_thumbnail(db_record[1], db_record[2]), 'media_type': db_record[2]})

  @staticmethod
  def get_thumbnail(media_path, media_type):
    if media_type == 'video':
      return 'https://voyageursgourmands.fr/wp-content/plugins/video-thumbnails/default.jpg'
    else:
      return media_path